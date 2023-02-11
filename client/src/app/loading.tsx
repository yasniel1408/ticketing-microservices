export default function RootLoading() {
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
