import {
    ComposableMap, Geographies, Geography
} from 'react-simple-maps';
import React, { useState } from 'react';
import { scaleQuantile } from 'd3-scale';
import LinearGradient from './LinearGradient.js';
import Box from '@mui/material/Box';
import ReactTooltip from 'react-tooltip';

const INDIA_TOPO_JSON = "https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json"
const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
];

const DEFAULT_COLOR = '#EEE';
const PROJECTION_CONFIG = {
    scale: 350,
    center: [78.9629, 22.5937]
};
const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};

const getValueByProps = () => {
    return parseInt(Math.random() * 100);
};
const getHeatMapData = (data) => {
    data.forEach((state) => {
        state['id'] = state["text_code"];
        state['value'] = state["new_active"];
        state['state'] = state["state_name"];
    });
    console.log(data);
    return data;

};
function IndiaMap(props) {

    const [tooltipContent, setTooltipContent] = useState('');
    const [data, setData] = useState(getHeatMapData(props.dataApi));

    const colorScale = scaleQuantile()
        .domain(data.map(d => d.value))
        .range(COLOR_RANGE);

    const gradientData = {
        fromColor: COLOR_RANGE[0],
        toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
        min: 0,
        max: data.reduce((max, item) => (parseInt(item.value) > max ? parseInt(item.value) : max), 0)
    };
    const onMouseEnter = (geo, current = { value: 'NA' }) => {
        return () => {
            setTooltipContent(`${geo.properties.name} Active : ${current.value} Recovered : ${current.new_cured} Death: ${current.new_death}`);
        };
    };

    const onMouseLeave = () => {
        setTooltipContent('');
    };



    return (
        <Box>
            <ReactTooltip
                multiline={true}
                data-html={true}
            >
                {tooltipContent}
            </ReactTooltip>

            <ComposableMap
                projectionConfig={PROJECTION_CONFIG}
                projection="geoMercator"
                width={220}
                height={200}
                data-tip=""
            >
                <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const current = data.find(s => s.id === geo.id);
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                                    style={geographyStyle}
                                    onMouseEnter={onMouseEnter(geo, current)}
                                    onMouseLeave={onMouseLeave}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <LinearGradient data={gradientData} />
        </Box>
    )
}

export default IndiaMap;