import { DeleteArea } from './DeleteArea';
import { TimeCapsule } from '../types';
import styles from '../styles/Home.module.css';

type Props = {
  isAdmin: boolean;
  isMobile: boolean;
  refetch: () => void;
  timeCapsule: TimeCapsule;
};

const GalleryItem = ({ isAdmin, isMobile, refetch, timeCapsule }: Props) => (
  <div className={styles['gallery-item']}>
    <div key={timeCapsule.id}>
      <a href={`/capsule/${timeCapsule.id}`} target="_black">
        <div>
          <img
            src={timeCapsule.svgLink}
            alt="time-capsule"
            width={isMobile ? 300 : 400}
          />
        </div>
      </a>
    </div>
    {isAdmin && <DeleteArea id={timeCapsule.id} onSuccess={refetch} />}
  </div>
);

export { GalleryItem };
