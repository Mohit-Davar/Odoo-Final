function formatDate(date) {
    const formattedDate = new Date(date)
    return formattedDate.toLocaleTimeString(('en-GB'), { hour12: true, month: "short", year: "numeric", day: "2-digit" });
}
export default formatDate