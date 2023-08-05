
const ByeComponent = () => {
  return (
    <div>
        <p>I am a buy component, my styles come from styles object</p>
        <p style={styles.redColor}>Give me green color please</p>
    </div>
  )
}

const styles = {
    redColor: {
        color: 'green',
    }
}

export default ByeComponent