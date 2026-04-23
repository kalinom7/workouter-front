import { useGetAllWorkoutTemplates } from "@/api/workouttemplate/hooks/useGetAllWorkoutTemplates";
import { Button } from "@/components/ui/button";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const WorkoutTemplateSelector = ({
  setPreviewedTemplateId,
  disabled,
}: {
  setPreviewedTemplateId: (id: string) => void;
  disabled: boolean;
}) => {
  const { data, isLoading, isError } = useGetAllWorkoutTemplates(userId);
  if (isError) return <>Error loading workout templates.</>;
  if (isLoading || !data) return <>Loading...</>;
  const templates = data;

  return (
    <>
      <h1>Select workout template</h1>
      <p>todo: searchbar</p>
      ALL TEMPLATES GALLERY
      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <Button
              disabled={disabled}
              onClick={() => setPreviewedTemplateId(template.id)}
            >
              {template.name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
