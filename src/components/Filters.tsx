interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FiltersProps {
  config: FilterConfig[];
  values: Record<string, string | undefined>;
  onChange: (values: Record<string, string | undefined>) => void;
}

export default function Filters({ config, values, onChange }: FiltersProps) {
  return (
    <div className="flex gap-3 flex-wrap">
      {config.map((filter) => (
        <select
          key={filter.key}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={values[filter.key] ?? ""}
          onChange={(e) =>
            onChange({ ...values, [filter.key]: e.target.value || undefined })
          }
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
