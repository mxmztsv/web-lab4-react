import React from 'react'
import useMousePosition from "../hooks/mouse.hook";
import ReactCursorPosition from 'react-cursor-position';
import {useMessage} from "../hooks/message.hook";


// this._onMouseMove(e) {
//         // this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
// }

export const Graph = (props) => {
    const message = useMessage()

    const r = 2

    const {
        detectedEnvironment: {
            isMouseDetected = false,
            isTouchDetected = false
        } = {},
        elementDimensions: {
            width = 0,
            height = 0
        } = {},
        position: {
            x = 0,
            y = 0
        } = {},
        isActive = false,
        isPositionOutside = false
    } = props;

    // const drawPoints = () => {
    //     { props.points.map((point, index) => {
    //
    //     }) }
    // }


    const svgSize = 300

    // перевод в координаты относительно начала координат на графике (с божьей помощью)
    const graphX = (((r / 50) * (svgSize / 2 - x) * -1) / 2).toFixed(1)
    const graphY = (((r / 50) * (svgSize / 2 - y)) / 2 ).toFixed(1)

    // const {mouseX, mouseY} = useMousePosition()
    // const hasMovedCursor = typeof mouseX === "number" && typeof mouseY === "number";

    // const [mouseX, setMouseX] = useState(0)
    // const [mouseY, setMouseY] = useState(0)
    // if (!categories.length) {
    //     return <p className="center">Фильмов пока нет</p>
    // }

    const graphClickHandler = () => {
        message('x = ' + graphX + ' y = ' + graphY)
    }


    return (
        // <ReactCursorPosition>
            <div onClick={graphClickHandler}>
                <svg width="300" height="300" className="svg-graph" xmlns="http://www.w3.org/2000/svg">

                    {/*Линии оси*/}

                    <line className="axis" x1="0" x2="300" y1="150" y2="150" stroke="black"/>
                    <line className="axis" x1="150" x2="150" y1="0" y2="300" stroke="black"/>
                    <polygon points="150,0 144,15 156,15" stroke="black"/>
                    <polygon points="300,150 285,156 285,144" stroke="black"/>

                    <line className="coor-line" x1="200" x2="200" y1="155" y2="145" stroke="black"/>
                    <line className="coor-line" x1="250" x2="250" y1="155" y2="145" stroke="black"/>

                    <line className="coor-line" x1="50" x2="50" y1="155" y2="145" stroke="black"/>
                    <line className="coor-line" x1="100" x2="100" y1="155" y2="145" stroke="black"/>

                    <line className="coor-line" x1="145" x2="155" y1="100" y2="100" stroke="black"/>
                    <line className="coor-line" x1="145" x2="155" y1="50" y2="50" stroke="black"/>

                    <line className="coor-line" x1="145" x2="155" y1="200" y2="200" stroke="black"/>
                    <line className="coor-line" x1="145" x2="155" y1="250" y2="250" stroke="black"/>

                    <text className="coor-text" x="195" y="140">R/2</text>
                    <text className="coor-text" x="248" y="140">R</text>

                    <text className="coor-text" x="40" y="140">-R</text>
                    <text className="coor-text" x="90" y="140">-R/2</text>

                    <text className="coor-text" x="160" y="105">R/2</text>
                    <text className="coor-text" x="160" y="55">R</text>

                    <text className="coor-text" x="160" y="205">-R/2</text>
                    <text className="coor-text" x="160" y="255">-R</text>

                    {/*first figure*/}
                    <polygon className="svg-figure rectangle-figure" points="150,150 150,250 50,250, 50,150"
                             fill="blue" fill-opacity="0.3" stroke="blue"/>

                    {/*second figure circle*/}
                    <path className="svg-figure circle-figure"
                          d="M 200 150 A 50 50, 90, 0, 0, 150 100 L 150 150 Z"
                          fill="green" fill-opacity="0.3" stroke="green"/>

                    {/*third figure*/}

                    <polygon className="svg-figure triangle-figure" points="150,200 150,150 200,150"
                             fill="yellow" fill-opacity="0.3" stroke="yellow"/>

                    <circle r="3" cx="150" cy="150" id="target-dot"/>

                    { props.points.map((point, index) => {
                        const cx = (point.x * 2) / point.r * 50 + 300 / 2
                        const cy = 300 / 2 - (point.y * 2) / point.r * 50
                        const color = point.result ? "white" : "black"
                            return (
                                <circle r="5" cx={cx} cy={cy} id="target-dot" fill={color}/>

                    )
                    }) }

                    {/*<path stroke="darkRed" fill="red" transform="translate(200, 100) rotate(90)"*/}
                    {/*      d="M10 50 0 50 C 0 16 16 0 50 0 V0 20*/}
                    {/*                         C 31 20 20 31 20 50Z" />*/}


                </svg>
                <p>
                    {/*{hasMovedCursor*/}
                    {/*    ? `Your cursor is at ${mouseX}, ${mouseY}.`*/}
                    {/*    : "Move your mouse around."}*/}
                    {/*Your cursor is at {x}, {y}.*/}
                    {`x: ${graphX}`}<br />
                    {`y: ${graphY}`}<br />
                </p>
            </div>
        // </ReactCursorPosition>
    )
}

Graph.defaultProps = {
    shouldShowIsActive: true
};
