import { promises as fs } from "fs";
import path from "path";
import type { Agent, Property, Submission } from "./types";

const propertiesPath = path.join(process.cwd(), "data", "properties.json");
const agentsPath = path.join(process.cwd(), "data", "agents.json");
const submissionsPath = path.join(process.cwd(), "data", "submissions.json");

export async function getProperties(): Promise<Property[]> {
  const raw = await fs.readFile(propertiesPath, "utf-8");
  return JSON.parse(raw);
}

export async function getProperty(id: string): Promise<Property | undefined> {
  const properties = await getProperties();
  return properties.find((p) => p.id === id);
}

export async function saveProperties(properties: Property[]): Promise<void> {
  await fs.writeFile(propertiesPath, JSON.stringify(properties, null, 2));
}

export async function getAgents(): Promise<Agent[]> {
  const raw = await fs.readFile(agentsPath, "utf-8");
  return JSON.parse(raw);
}

export async function getAgent(id: string): Promise<Agent | undefined> {
  const agents = await getAgents();
  return agents.find((a) => a.id === id);
}

export async function getSubmissions(): Promise<Submission[]> {
  const raw = await fs.readFile(submissionsPath, "utf-8");
  return JSON.parse(raw);
}

export async function saveSubmissions(submissions: Submission[]): Promise<void> {
  await fs.writeFile(submissionsPath, JSON.stringify(submissions, null, 2));
}
