import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";

export default function UsersPage() {
  return (
    <section className="max-w-2xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>cod</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>fulano@gmail.com</TableCell>
            <TableCell>Requisitado</TableCell>
            <TableCell className="flex items-center gap-2">
              <Button className="w-6 h-6 p-0" variant={`destructive`}>
                <XCircle className="w-4 h-4" />
              </Button>
              <Button className="w-6 h-6 p-0" variant={`outline`}>
                <CheckCircle className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>fulano@gmail.com</TableCell>
            <TableCell>Enviado</TableCell>
            <TableCell className="flex items-center gap-2">
              <Button className="w-6 h-6 p-0" variant={`destructive`}>
                <XCircle className="w-4 h-4" />
              </Button>
              <Button className="w-6 h-6 p-0" variant={`outline`}>
                <CheckCircle className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
