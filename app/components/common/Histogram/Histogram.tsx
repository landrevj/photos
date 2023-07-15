import { scaleLinear } from '@visx/scale';

/** external components */
import { AreaClosed } from '@visx/shape';
import { Group } from '@visx/group';
import { LinearGradient } from '@visx/gradient';

/** components */

/** state */

/** helpers */

/** types */
import type { Image } from '@/types/images';

interface HistogramProps {
  data: Image['histogram'];
  width: number;
  height: number;
}

export const Histogram = ({ data, width, height }: HistogramProps) => {
  const xScale = scaleLinear<number>({
    range: [0, width],
    domain: [0, 255],
  });
  const yScale = scaleLinear<number>({
    range: [height, 0],
    domain: [0, data.yMax],
  });

  return (
    <svg width={width} height={height}>
      <LinearGradient id='r-hist-gradient' from='#f83527aa' to='#d12c1faa' />
      <LinearGradient id='g-hist-gradient' from='#98f635aa' to='#68a924aa' />
      <LinearGradient id='b-hist-gradient' from='#45b3ffaa' to='#378fccaa' />
      <LinearGradient id='rg-hist-gradient' from='#fff855aa' to='#f2eb4faa' />
      <LinearGradient id='gb-hist-gradient' from='#4bf4f1aa' to='#31e1e9aa' />
      <LinearGradient id='rb-hist-gradient' from='#ff4ed6aa' to='#e346c9aa' />
      <Group>
        <AreaClosed
          data={data.channels.red.data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d)}
          yScale={yScale}
          fill='url(#r-hist-gradient)'
        />
        <AreaClosed
          data={data.channels.green.data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d)}
          yScale={yScale}
          fill='url(#g-hist-gradient)'
        />
        <AreaClosed
          data={data.channels.blue.data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d)}
          yScale={yScale}
          fill='url(#b-hist-gradient)'
        />
        <AreaClosed
          data={data.channels.rgOverlap.data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d)}
          yScale={yScale}
          fill='url(#rg-hist-gradient)'
        />
        <AreaClosed
          data={data.channels.gbOverlap.data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d)}
          yScale={yScale}
          fill='url(#gb-hist-gradient)'
        />
        <AreaClosed
          data={data.channels.rbOverlap.data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d)}
          yScale={yScale}
          fill='url(#rb-hist-gradient)'
        />
        <AreaClosed
          data={data.channels.rgbOverlap.data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d)}
          yScale={yScale}
          fill='#bbb'
        />
      </Group>
    </svg>
  );
};

export default Histogram;
