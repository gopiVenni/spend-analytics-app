import {    
    Chart,
    Interval,
    Line,
    InteractionTooltip,
    registerShape,
    Axis,
    Geom,
    Tooltip,
    Interaction,
    Coordinate} from 'bizcharts'; 
import './chart.css';
const data = [
  { category: 'Food', amount: 275 },
  { category: 'Travel', amount: 300 },
  { category: 'Shoping', amount: 500 },
  { category: 'Others', amount: 2000 },
];
export default function(props){
    //console.log('graph data '+porps.gdata);

    
    return(
        <div className='bar-container'>
            {
                props.type==='Lader Line Chart'?
                    <Chart scale={{value: {min: 0}}} padding={[10,20,50,40]} autoFit height={150} data={props.gdata} >
                        <Line shape="hv" position="category*amount" />
                    </Chart> 
                    :
                    props.type==='Interval'?
                    <Chart height={150} autoFit data={props.gdata} padding={[30,20,30,50]}>
                        <Interval position="category*amount" 
                            style={['amount',  (val) => {
                            return {
                            lineWidth: 1,
                            strokeOpacity: 1,
                            fillOpacity: 0.3,
                            opacity: 0.65,
                            // stroke: colorMap[val],
                            };
                        }]}/>
                            <Interaction type="active-region" />
                    </Chart> 
                    :
                    props.type==='Rose Chart'?
                        <Chart height={150} data={props.gdata} autoFit>
                            <Coordinate
                            type="polar"
                            startAngle={Math.PI} 
                            endAngle={Math.PI * (3 / 2)} 
                            />
                            <Axis name="value" grid={{
                            line: {
                                type: 'circle',
                            },
                            closed: false,
                            }} />
                            <Tooltip showTitle={false} />
                            <Interval
                            position="category*amount"
                            adjust="stack"
                            color={['category', 'rgb(252,143,72)-rgb(255,215,135)']}
                            element-highlight
                            style={{
                                lineWidth: 1,
                                stroke: '#fff',
                            }}
                            label={['amount', {
                                offset: -15,
                                style: {
                                textAlign: 'center',
                                fill: '#000',
                                },
                            }]}
                            />
                        </Chart>
                    :''
             
                
            }
        </div>
    )
}