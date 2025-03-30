import styles from './RegisterDescription.module.css';

interface RegisterDescriptionProps {
  title: string;
  description?: string;
}

export default function RegisterDescription(props: RegisterDescriptionProps) {
  const { title, description } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
}
