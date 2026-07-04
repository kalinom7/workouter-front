import { useGetAllWorkoutTemplates } from "@/api/workouttemplate/hooks/useGetAllWorkoutTemplates";
import { globalUserId } from "@/utils/globalUserId";
import { WorkoutTemplateCard } from "./WorkoutTemplateCard";

export const WorkoutTemplateSelector = ({
  setSelectedTemplateId,
  selectedTemplateId,
  search,
}: {
  setSelectedTemplateId: (id: string) => void;
  selectedTemplateId: string;
  search: string;
}) => {
  const { data, isLoading, isError } = useGetAllWorkoutTemplates(globalUserId);

  if (isError) return <>Error loading workout templates.</>;
  if (isLoading || !data) return <>Loading...</>;

  const templates = data;
  const searchedTemplates = search
    ? templates.filter((template) =>
        template.name.toLowerCase().includes(search.toLowerCase()),
      )
    : templates;

  return (
    <ul className="flex max-h-[40dvh] flex-col gap-3 overflow-y-auto py-5">
      {searchedTemplates.map((template) => (
        <li key={template.id}>
          <WorkoutTemplateCard
            template={template}
            isSelected={template.id === selectedTemplateId}
            onClick={() => setSelectedTemplateId(template.id)}
          />
        </li>
      ))}
    </ul>
  );
};
