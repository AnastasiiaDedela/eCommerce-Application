import styles from "./HelloComponent.module.scss"

const HelloComponent = () => {
  return (
    <div>
        <div>I am a Hello Component</div>
        <div className={styles.redText}>Give me pls red color baby</div>
    </div>
  )
}

export default HelloComponent;
