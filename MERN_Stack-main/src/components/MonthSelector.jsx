import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  return (
    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month} value={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MonthSelector;