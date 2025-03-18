import "@testing-library/jest-dom";
import { fireEvent,render,screen} from "@testing-library/react";
import App from "../App";

describe("todo list testing",()=>{
    test("render To-Do List title",()=>{
        render(<App/>);
        expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
    });

    test("add To-Do List Item",()=>{
        render(<App/>);

        const input=screen.getByPlaceholderText("Add a new task...");
        const addButton=screen.getByText("Add");

        fireEvent.change(input,{target:{value:"New Task"}});
        fireEvent.click(addButton);

        expect(screen.getByText("New Task")).toBeInTheDocument();
    })

    test("delete To-Do List Item",()=>{
        render(<App/>);
        
        const input = screen.getByPlaceholderText("Add a new task...");
        const addButton = screen.getByText("Add");
        
        fireEvent.change(input, { target: { value: "Task to Delete" } });
        fireEvent.click(addButton);
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
    })

    test("edit To-Do List Item",()=>{
        render(<App/>);

        const input=screen.getByPlaceholderText("Add a new task...");
        const addButton=screen.getByText("Add");

        fireEvent.change(input,{target:{value:"Old Task"}});
        fireEvent.click(addButton);

        const editBtn=screen.getByText("Edit");
        fireEvent.click(editBtn);

        const editInput=screen.getByDisplayValue("Old Task");
        fireEvent.change(editInput,{target:{value:"updated task"}});
        fireEvent.click(screen.getByText("Save"));

        expect(screen.getByText("updated task")).toBeInTheDocument();
        expect(screen.queryByText("Old Task")).not.toBeInTheDocument();
    })

    test("task completion",()=>{
        render(<App/>);

        const input=screen.getByPlaceholderText("Add a new task...");
        const addButton=screen.getByText("Add");

        fireEvent.change(input,{target:{value:"Task to complete"}});
        fireEvent.click(addButton);

        const checkbox=screen.getByRole("checkbox");
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    })

    test("add subtask",()=>{
        render(<App/>)

        const taskInput=screen.getByPlaceholderText("Add a new task...");
        const addButton=screen.getByText("Add");
        fireEvent.input(taskInput,{target:{value:"New task"}});
        fireEvent.click(addButton);

        const subtaskInput=screen.getByPlaceholderText("Add a subtask...");
        fireEvent.change(subtaskInput,{target:{value: "New Subtask"}});
        fireEvent.click(screen.getByText("+ Add Subtask"));

        expect(screen.getByText("New Subtask")).toBeInTheDocument();
    })

    test("clearAll task",()=>{
        render(<App/>);

        const taskInput=screen.getByPlaceholderText("Add a new task...");
        const addButton=screen.getByText("Add");
        const clearAllBtn=screen.getByText("Clear All");

        fireEvent.change(taskInput,{target:{value:"New Task 1"}});
        fireEvent.click(addButton);
        fireEvent.change(taskInput,{target:{value:"New Task 2"}});
        fireEvent.click(addButton);

        fireEvent.click(clearAllBtn);
        expect(screen.queryByText("New Task 1")).not.toBeInTheDocument();
        expect(screen.queryByText("New Task 2")).not.toBeInTheDocument();
    })
})