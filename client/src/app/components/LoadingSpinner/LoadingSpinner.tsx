"use client";

export default function LoadingSpinner() {
  return (
    <div
      style={{
        height: "40vh",
        alignContent: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
