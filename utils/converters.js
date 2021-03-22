const formatSeconds = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds - minutes * 60;
    return `${minutes}:${seconds}`
}

module.exports = {formatSeconds};