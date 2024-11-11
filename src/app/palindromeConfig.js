// palindromeConfig.js
const palindromeConfig = {
  initialState: "q0",
  acceptingStates: ["acceptEven"],
  rejectingStates: ["reject"],
  blank: "_",
  states: ["q0", "q1", "q2", "q3", "q4", "q5", "acceptEven", "reject"],
  transitions: {
    q0: {
      0: ["q1", "X", "R"],
      1: ["q2", "X", "R"],
      _: ["acceptEven", "_", "R"],
      X: ["acceptEven", "X", "R"],
    },
    q1: {
      0: ["q1", "0", "R"],
      1: ["q1", "1", "R"],
      _: ["q3", "_", "L"],
      X: ["q3", "X", "L"],
    },
    q2: {
      0: ["q2", "0", "R"],
      1: ["q2", "1", "R"],
      _: ["q4", "_", "L"],
      X: ["q4", "X", "L"],
    },
    q3: {
      X: ["acceptEven", "X", "R"],
      0: ["q5", "X", "L"],
      1: ["reject", "1", "L"],
    },
    q4: {
      X: ["acceptEven", "X", "R"],
      1: ["q5", "X", "L"],
      0: ["reject", "0", "L"],
    },
    q5: {
      0: ["q5", "0", "L"],
      1: ["q5", "1", "L"],
      X: ["q0", "X", "R"],
    },
  },
};

export default palindromeConfig;
