import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface CarouselItemProps {
  item_id: number;
  item_name: string;
  brewery: string;
  style: string;
  image_url: string;
  width: number;
  height: number;
}

function CarouselItem ({ item_id, item_name, brewery, style, image_url, width, height }:CarouselItemProps ) {
  return (
    <Link href={`/items/${item_id}`}>
      <div className='carousel-item'>
        <div className='card card-bordered w-80'>
          <figure>
            <div className='absolute top-5 left-5 badge badge-lg badge-accent rounded-none'>
              {style}
            </div>
            <Image
              src={image_url}
              alt={item_name}
              width={width}
              height={height}
            />
          </figure>
          <div className='card-body'>
            <div className='card-title'>{item_name}</div>
            <div>{brewery}</div>
            <FontAwesomeIcon icon={faHeart} className="fa-lg" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarouselItem;