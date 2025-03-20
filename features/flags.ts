export enum FeatureFlag {
    AGENT = "agent",
    AGENT_TEAM = "agent-teams",
    AGENT_CHAT = "agent-chat",
    AGENT_TASKS = "ai-agent-tasks",
    TOOLS = "tools",
    PRE_DEFINED_TASKS = "pre-defined-task",
    PRE_DEFINED_TEAMS = "pre-defined-teams",

}

export const featureFlagEvents: Record<FeatureFlag, { event: string }> = {
    [FeatureFlag.AGENT]: { event: "agent-create" },
    [FeatureFlag.AGENT_TEAM]: { event: "agent-teams" },
    [FeatureFlag.AGENT_CHAT]: { event: "" },
    [FeatureFlag.AGENT_TASKS]: { event: "tasks" },
    [FeatureFlag.TOOLS]: { event: "tools" },
    [FeatureFlag.PRE_DEFINED_TASKS]: { event: "" },
    [FeatureFlag.PRE_DEFINED_TEAMS]: { event: "" },
}