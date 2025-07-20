type ErrorProps = {
  text: string;
};

function Error({ text }: ErrorProps) {
  return (
    <div data-testid="error-container" className="error-container">
      <h1>Sorry, we failed to load weather data.</h1>
      <p>{text}</p>
    </div>
  );
}

export default Error;
