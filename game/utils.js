const random = (high, low) => {
    return Math.floor(Math.random() * (high - low + 1) + low)
}

module.exports = { random };