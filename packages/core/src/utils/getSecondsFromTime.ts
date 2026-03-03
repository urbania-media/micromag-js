const getSecondsFromTime = (time) => {
    const t = time.split(':');

    try {
        let s = t[2].split(',');

        if (s.length === 1) {
            s = t[2].split('.');
        }

        return (
            parseFloat(t[0], 10) * 3600 +
            parseFloat(t[1], 10) * 60 +
            parseFloat(s[0], 10) +
            parseFloat(s[1], 10) / 1000
        );
    } catch (e) {
        return 0;
    }
};

export default getSecondsFromTime;