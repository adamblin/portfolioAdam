export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  stack?: string;
};

export const experiences: Experience[] = [
   {
    company: "NTT Data",
    role: "Digital Architect - Cloud DevOps",
    period: "April 2025 - April 2026",
    description:
      "Migration of on-premise infrastructure to AWS cloud through the design and implementation of automated DevOps solutions, Infrastructure as Code (IaC) and Configuration as Code (CaC).",
    achievements: [
      "Improved AWS-based cloud infrastructure using EC2, S3 and EFS.",
      "Automated infrastructure provisioning with Terraform following modular and reusable patterns.",
      "Implemented configuration management and application deployment using Ansible.",
      "Built CI/CD pipelines with Jenkins and Groovy.",
      "Developed Bash scripts for system automation and operational tasks on EC2 instances.",
      "Integrated event-driven workflows using AWS EventBridge.",
      "Collaborated within an agile team, contributing to architecture decisions and best practices."
    ],
    stack:
      "AWS, Terraform, Ansible, Jenkins, Groovy, Bash, Git"
  },
];
