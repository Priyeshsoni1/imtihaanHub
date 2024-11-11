import { toast } from "react-hot-toast";
import { v4 } from "uuid"; // Import the default data
export const createInstructionSlice = (set, get) => ({
  instruction: [], // Initialize with default data
  // authUser: null,

  setInstruction: (instruction) => {
    set(() => ({
      instruction,
    }));
  },

  // Function to add a new instruction to the list
  addInstruction: (newInstruction) => {
    const { instruction } = get();

    const instructionToAdd = {
      instructionId: v4(),
      ...newInstruction,
    };

    set(() => ({
      instruction: [instructionToAdd, ...instruction],
    }));
    console.log(
      "instructionToAdd",
      instructionToAdd,
      "instruction",
      instruction,
      "newInstruction",
      newInstruction
    );

    toast.success("instruction added successfully!");
  },
  getInstruction: () => {
    return get().instruction;
  },
});
