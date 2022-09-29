/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Keypad from './Keypad';

export default {
    component: Keypad,
    title: 'Elements/Keypad',
};

const phoneKeyColumns = 3;
const phoneKeySpacing = 5;
const phoneKeySize = 64;
const phoneKeypadWidth = phoneKeySize * phoneKeyColumns + phoneKeySpacing * phoneKeyColumns;
const phoneKeyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    border: '2px solid #ccc',
    fontSize: '30px',
    fontWeight: '700',
    width: phoneKeySize,
    height: phoneKeySize,
};

const items = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((number) => (
    <button style={phoneKeyStyle} key={`cell-${number}`} type="button">
        {number}
    </button>
));

export const telephone = () => (
    <Keypad
        items={items}
        columns={phoneKeyColumns}
        width={phoneKeypadWidth}
        spacing={phoneKeySpacing}
    />
);

const emojisColumns = 2;
const emojisSpacing = 15;
const emojisKeySize = 100;
const emojisKeypadWidth = emojisKeySize * emojisColumns + emojisSpacing * emojisColumns;
const emojisKeyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    border: '4px solid #fff',
    backgroundColor: '#ccc',
    fontSize: '50px',
    fontWeight: '700',
    width: emojisKeySize,
    height: emojisKeySize,
};

const emojisItems = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣'].map((number) => (
    <button style={emojisKeyStyle} key={`cell-${number}`} type="button">
        {number}
    </button>
));

export const emojis = () => (
    <Keypad
        items={emojisItems}
        columns={emojisColumns}
        width={emojisKeypadWidth}
        spacing={emojisSpacing}
    />
);



