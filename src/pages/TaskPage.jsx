import { useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const createdAt = searchParams.get("createdAt");

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : "Data não disponível";

  const theme = searchParams.get("theme");
  const themeColor = searchParams.get("themeColor");
  console.log(themeColor);

  return (
    <div
      style={{ backgroundColor: themeColor }}
      className={`h-screen w-screen p-6 ${
        theme === "light" ? "shadow-[#0000004f]" : "shadow-[#525252]"
      }`}
    >
      <div className="w-[700px] space-y-10 m-auto">
        <div className="flex justify-center relative mb-6">
          <button
            //navigate(-1) é uma função que te faz voltar a página anterior
            onClick={() => navigate(-1)}
            style={{ backgroundColor: themeColor }}
            className={`absolute shadow left-0 top-0 bottom-0 text-[#8EDE65] bg-slate-800 px-2 rounded-md ${
              theme === "light" ? "shadow-[#0000004f]" : "shadow-[#525252]"
            }`}
          >
            <ChevronLeftIcon></ChevronLeftIcon>
          </button>
          <Title>Task Details:</Title>
        </div>

        <div className="bg-[#F9FAFB] p-4 rounded-md shadow">
          <h2 className="text-xl text-slate-600 font-bold">{title}</h2>
          <p className="text-slate-600">{description}</p>

          <p className="text-slate-600 text-[14px]">Added in {formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
