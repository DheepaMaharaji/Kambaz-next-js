const categorizePost = (date: Date, now: Date): string => {
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays <= 7) return 'Last Week';
  
  // Get the Monday of the week
  const postDate = new Date(date);
  const day = postDate.getDay();
  const diff = postDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(postDate.setDate(diff));
  
  // Get Sunday
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return `${monday.getMonth() + 1}/${monday.getDate()} - ${sunday.getMonth() + 1}/${sunday.getDate()}`;
};
