export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld === true ? '#f5f749' : 'white',
  };
  const dieNum = {
    color: props.isHeld === true ? 'black' : '#302f2f',
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-num" style={dieNum}>
        {props.value}
      </h2>
    </div>
  );
}
