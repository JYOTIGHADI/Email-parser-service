
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (res && typeof res.status === "function") {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  } else {
    console.error("res.status is not a function! Check Express app setup.");
  }
};

export default errorHandler;
