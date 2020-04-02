const getGridLayoutName = layout =>
    layout.map(it => `${it.rows}_${it.columns.join('_')}`).join('|');

export default getGridLayoutName;
