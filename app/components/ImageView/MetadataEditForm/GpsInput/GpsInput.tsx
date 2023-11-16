import { useState } from 'react';

/** external components */
import { Map, Marker } from 'pigeon-maps';
import { MdAddLocation, MdLocationPin } from '@/lib/icons';

/** components */
import Button from '@/app/components/common/Button/Button';

/** state */

/** helpers */

/** types */
import type { Image } from '@/types/images';

interface GpsInputProps {
  formValues: Partial<Image>;
  onDropPin: (latitude: number, longitude: number) => void;
}

export const GpsInput = ({ formValues, onDropPin }: GpsInputProps) => {
  const [isDropPin, setIsDropPin] = useState(false);

  return (
    <div className='flex h-80 flex-col gap-2'>
      <h4>GPS</h4>
      <div className='flex-1 overflow-hidden rounded-xl drop-shadow'>
        <Map
          attribution={false}
          key={formValues.name}
          defaultCenter={[
            formValues.gps?.latitude ??
              Number(process.env.NEXT_PUBLIC_MAP_DEFAULT_LATITUDE ?? 0),
            formValues.gps?.longitude ??
              Number(process.env.NEXT_PUBLIC_MAP_DEFAULT_LONGITUDE ?? 0),
          ]}
          defaultZoom={
            formValues.gps?.latitude
              ? 14
              : Number(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM)
          }
          onClick={({ latLng }) => {
            if (isDropPin) {
              onDropPin(...latLng);
            }
            setIsDropPin(false);
          }}
        >
          <Button
            disabled={isDropPin}
            color='transparent'
            className='absolute right-0 rounded-full p-2 text-3xl text-red-600 drop-shadow'
            icon={<MdAddLocation />}
            onClick={() => setIsDropPin(true)}
          />
          {formValues.gps?.latitude && (
            <Marker
              className='mt-2'
              width={36}
              anchor={[
                formValues.gps?.latitude || 0,
                formValues.gps?.longitude || 0,
              ]}
            >
              <MdLocationPin className='text-4xl text-red-600' />
            </Marker>
          )}
        </Map>
      </div>
    </div>
  );
};

export default GpsInput;
