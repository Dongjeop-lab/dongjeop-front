export function QuizMarker() {
  return (
    <div
      style={{
        width: '64px',
        height: '64px',
        border: '7px solid #000000',
        borderRadius: '50%',
        opacity: 1,
        boxShadow: '0px 3.2px 6.4px 0px rgba(0, 0, 0, 0.25)',
        transform: 'rotate(0deg)',
      }}
    />
  );
}

export function QuizMarkerHint() {
  return (
    <div
      style={{
        width: '64px',
        height: '64px',
        border: '7px solid rgba(0, 0, 0, 0.4)',
        borderRadius: '50%',
        opacity: 1,
        boxShadow: '0px 3.2px 6.4px 0px rgba(0, 0, 0, 0.25)',
        transform: 'rotate(0deg)',
      }}
    />
  );
}
