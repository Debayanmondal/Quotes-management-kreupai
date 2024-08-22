export const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "An error occurred", error: error.message });
};
