
const pool = require('../service/db');

// Events
exports.createEvent = async (userID, eventData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const {
            category_id,
            title,
            description,
            location, // coordinates object {x, y}
            address, // location string
            start_date,
            end_date,
            status_id,
            images
        } = eventData;

        const eventResult = await client.query(
            `INSERT INTO events (user_id, title, description, category, location, coordinates, start_datetime, end_datetime, status)
             VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($6, $7), 4326), $8, $9, $10) RETURNING *`,
            [userID, title, description, category_id, address, location.x, location.y, start_date, end_date, status_id]
        );
        const newEvent = eventResult.rows[0];

        if (images && images.length > 0) {
            const imagePromises = images.map((image, index) => {
                return client.query(
                    'INSERT INTO event_images (event_id, image_url, is_cover) VALUES ($1, $2, $3)',
                    [newEvent.id, image.base64, index === 0] // Set first image as cover
                );
            });
            await Promise.all(imagePromises);
        }

        await client.query('COMMIT');
        return newEvent;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`[DATABASE] Error creating event: ${error.message}`);
        throw error;
    } finally {
        client.release();
    }
};


exports.getEvents = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                e.id,
                e.user_id,
                e.title,
                e.description,
                e.location,
                ST_X(e.coordinates::geometry) AS longitude,
                ST_Y(e.coordinates::geometry) AS latitude,
                e.start_datetime,
                e.end_datetime,
                ec.category AS event_category,
                es.status AS event_status,
                e.created_at,
                ARRAY_AGG(
                    JSON_BUILD_OBJECT(
                        'image_id', ei.id,
                        'image_url', ei.image_url,
                        'is_cover', ei.is_cover,
                        'uploaded_at', ei.uploaded_at
                    )
                ) AS images
            FROM 
                events e
            JOIN 
                event_categories ec ON e.category = ec.id
            JOIN 
                event_status es ON e.status = es.id
            LEFT JOIN 
                event_images ei ON e.id = ei.event_id
            GROUP BY 
                e.id, ec.category, es.status
            ORDER BY 
                e.created_at DESC;
        `);

        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting events: ${error.message}`);
        throw error;
    }
};


exports.getEventsByProfile = async (userID) => {
    try {
        const result = await pool.query(`
            SELECT 
                e.id,
                e.user_id,
                e.title,
                e.description,
                e.location,
                ST_X(e.coordinates::geometry) AS longitude,
                ST_Y(e.coordinates::geometry) AS latitude,
                e.start_datetime,
                e.end_datetime,
                ec.category AS event_category,
                es.status AS event_status,
                e.created_at,
                ARRAY_AGG(
                    JSON_BUILD_OBJECT(
                        'image_id', ei.id,
                        'image_url', ei.image_url,
                        'is_cover', ei.is_cover,
                        'uploaded_at', ei.uploaded_at
                    ) ORDER BY ei.uploaded_at DESC
                ) AS images
            FROM 
                events e
            JOIN 
                event_categories ec ON e.category = ec.id
            JOIN 
                event_status es ON e.status = es.id
            LEFT JOIN 
                event_images ei ON e.id = ei.event_id
            WHERE 
                e.user_id = $1
            GROUP BY 
                e.id, ec.category, es.status
            ORDER BY 
                e.created_at DESC
        `, [userID]);

        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting events: ${error.message}`);
        throw error;
    }
};


exports.getEventById = async (id) => {
    try {
        const eventResult = await pool.query(
            `SELECT e.*, ST_X(e.coordinates::geometry) as lon, ST_Y(e.coordinates::geometry) as lat
             FROM events e WHERE e.id = $1`, [id]);
        if (eventResult.rows.length === 0) return null;

        const event = eventResult.rows[0];

        const response = {
            id: event.id,
            title: event.title,
            description: event.description,
            address: event.location, // text address
            location: { x: event.lon, y: event.lat }, // geo object
            category_id: event.category_id,
            start_date: event.start_datetime,
            end_date: event.end_datetime,
            status_id: event.status,
        };

        const imagesResult = await pool.query('SELECT id, image_url, is_cover FROM event_images WHERE event_id = $1', [id]);
        response.images = imagesResult.rows.map(img => ({
            id: img.id,
            preview: img.image_url,
        }));

        return response;
    } catch (error) {
        console.error(`[DATABASE] Error getting event by ID: ${error.message}`);
        throw error;
    }
};

exports.updateEvent = async (id, eventData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const {
            category_id,
            title,
            description,
            location, // coordinates
            address, // location string
            start_date,
            end_date,
            status_id,
            images
        } = eventData;

        const result = await client.query(
            `UPDATE events SET 
                category_id = $1, 
                title = $2, 
                description = $3, 
                coordinates = ST_SetSRID(ST_MakePoint($4, $5), 4326), 
                location = $6, 
                start_datetime = $7, 
                end_datetime = $8, 
                status = $9
             WHERE id = $10 RETURNING *`,
            [category_id, title, description, location.x, location.y, address, start_date, end_date, status_id, id]
        );

        await client.query('DELETE FROM event_images WHERE event_id = $1', [id]);
        if (images && images.length > 0) {
            const imagePromises = images.map((image, index) => {
                return client.query(
                    'INSERT INTO event_images (event_id, image_url, is_cover) VALUES ($1, $2, $3)',
                    [id, image.base64, index === 0]
                );
            });
            await Promise.all(imagePromises);
        }

        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`[DATABASE] Error updating event: ${error.message}`);
        throw error;
    } finally {
        client.release();
    }
};

exports.deleteEvent = async (id) => {
    try {
        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error deleting event: ${error.message}`);
        throw error;
    }
};

// Categories
exports.getEventCategories = async () => {
    try {
        const result = await pool.query('SELECT * FROM event_categories');
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting event categories: ${error.message}`);
        throw error;
    }
};

// Statuses
exports.getEventStatuses = async () => {
    try {
        const result = await pool.query('SELECT * FROM event_status');
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting event statuses: ${error.message}`);
        throw error;
    }
};

// Photos
exports.addEventPhoto = async (photo) => {
    try {
        const {
            event_id,
            image_url,
            is_cover
        } = photo;
        const result = await pool.query(
            'INSERT INTO event_images (event_id, image_url, is_cover) VALUES ($1, $2, $3) RETURNING *',
            [event_id, image_url, is_cover || false]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error adding event photo: ${error.message}`);
        throw error;
    }
};

exports.getEventPhotos = async (eventId) => {
    try {
        const result = await pool.query('SELECT * FROM event_images WHERE event_id = $1', [eventId]);
        return result.rows;
    } catch (error) {
        console.error(`[DATABASE] Error getting event photos: ${error.message}`);
        throw error;
    }
};

exports.deleteEventPhoto = async (id) => {
    try {
        const result = await pool.query('DELETE FROM event_images WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`[DATABASE] Error deleting event photo: ${error.message}`);
        throw error;
    }
};
