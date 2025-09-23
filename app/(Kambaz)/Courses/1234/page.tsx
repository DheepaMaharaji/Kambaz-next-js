import { redirect } from "next/navigation";


export default function CoursesPage(/*{ params }: { params: { cid: string } }*/) {
  redirect(`/Courses/1234/Home`);
  return null;
}
