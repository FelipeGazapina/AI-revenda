import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersPage() {
  return (
    <section className="max-w-2xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>cod</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Activity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">USR001</TableCell>
            <TableCell>fulano@gmail.com</TableCell>
            <TableCell>3 acessos/dia</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
