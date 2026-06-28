function handlePatients(patients) {
  const treatedImmediately = [];
  const normalTreated = [];
  const missingDataList = [];

  for (const patient of patients) {
    if (!patient.hasData) {
      missingDataList.push(patient);
      continue;
    }

    if (patient.condition === "critical") {
      treatedImmediately.push(patient);
    } else {
      normalTreated.push(patient);
    }
  }

  normalTreated.sort((a, b) => b.severity - a.severity);

  return {
    treatedImmediately,
    normalTreated,
    missingDataList,
  };
}

const patients = [
  {
    name: "Ahmed",
    severity: 3,
    hasData: true,
    condition: "normal",
  },
  {
    name: "Mohamed",
    severity: 5,
    hasData: true,
    condition: "critical",
  },
  {
    name: "Ali",
    severity: 4,
    hasData: false,
    condition: "normal",
  },
  {
    name: "Omar",
    severity: 5,
    hasData: true,
    condition: "normal",
  },
];

console.log(handlePatients(patients));