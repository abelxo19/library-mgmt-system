export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date();
}; 