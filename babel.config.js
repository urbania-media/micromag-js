module.exports = api => ({
    presets: [
        api.env('production') && require.resolve('babel-preset-react-app/prod'),
        api.env('development') && require.resolve('babel-preset-react-app/dev'),
    ].filter(Boolean),
    plugins: [
        api.env('production') && require.resolve('@babel/plugin-transform-runtime'),
    ].filter(Boolean),
});
