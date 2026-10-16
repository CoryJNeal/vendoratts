import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Intake, Job } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "jobs");

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

function fileFor(id: string) {
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error("Invalid job id");
  }
  return path.join(DATA_DIR, `${id}.json`);
}

export function createDraftJob(intake: Intake): Job {
  const now = new Date().toISOString();
  return {
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: "draft",
    pipelineStatus: "website_derived_draft",
    progress: [],
    intake,
    summary: null,
    products: [],
    attributes: [],
    images: [],
    questions: [],
    fieldInventory: [],
    vendorInstructions: "",
    acknowledgmentWording: "",
  };
}

export async function saveJob(job: Job): Promise<void> {
  await ensureDir();
  await writeFile(fileFor(job.id), JSON.stringify(job, null, 2), "utf8");
}

export async function getJob(id: string): Promise<Job | null> {
  try {
    const raw = await readFile(fileFor(id), "utf8");
    return JSON.parse(raw) as Job;
  } catch {
    return null;
  }
}

export async function listJobs(): Promise<Job[]> {
  await ensureDir();
  const files = await readdir(DATA_DIR);
  const jobs: Job[] = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const raw = await readFile(path.join(DATA_DIR, file), "utf8");
    jobs.push(JSON.parse(raw) as Job);
  }
  return jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
