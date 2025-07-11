type ErrorProps = {
  text: string;
};

function Error({ text }: ErrorProps) {
  return (
    <div className="error-container">
      <h1>Sorry, we failed to load weather data.</h1>
      <p>{text}</p>
    </div>
  );
}

export default Error;
