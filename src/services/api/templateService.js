const templates = [
  {
    Id: 1,
    name: "Meeting Notes",
    description: "Structure your meeting discussions and action items",
    icon: "Users",
    color: "#5B4B8A",
    category: "Business",
    sections: [
      "Meeting Details",
      "Attendees",
      "Agenda",
      "Discussion Points",
      "Action Items",
      "Next Steps"
    ],
    content: `# Meeting Notes

## Meeting Details
**Date:** ${new Date().toLocaleDateString()}
**Time:** 
**Duration:** 
**Location/Platform:** 

## Attendees
- 
- 
- 

## Agenda
1. 
2. 
3. 

## Discussion Points

### Topic 1


### Topic 2


### Topic 3


## Action Items
- [ ] **Task 1** - Assigned to: [Name] - Due: [Date]
- [ ] **Task 2** - Assigned to: [Name] - Due: [Date]
- [ ] **Task 3** - Assigned to: [Name] - Due: [Date]

## Next Steps
- 
- 
- 

## Additional Notes

`
  },
  {
    Id: 2,
    name: "Daily Journal",
    description: "Reflect on your day and plan ahead",
    icon: "Calendar",
    color: "#E67E50",
    category: "Personal",
    sections: [
      "Today's Focus",
      "Accomplishments",
      "Challenges",
      "Gratitude",
      "Tomorrow's Goals"
    ],
    content: `# Daily Journal - ${new Date().toLocaleDateString()}

## Today's Focus
What are the 3 most important things I want to accomplish today?

1. 
2. 
3. 

## Morning Reflection
How am I feeling this morning?



## Accomplishments
What did I achieve today?

- 
- 
- 

## Challenges
What obstacles did I face and how did I handle them?



## Lessons Learned
What did I learn today?



## Gratitude
Three things I'm grateful for today:

1. 
2. 
3. 

## Tomorrow's Goals
What do I want to focus on tomorrow?

1. 
2. 
3. 

## Evening Reflection
How was my day overall?


`
  },
  {
    Id: 3,
    name: "Project Planning",
    description: "Organize your project from start to finish",
    icon: "Briefcase",
    color: "#4CAF50",
    category: "Business",
    sections: [
      "Project Overview",
      "Objectives",
      "Timeline",
      "Resources",
      "Risks",
      "Success Metrics"
    ],
    content: `# Project Planning

## Project Overview
**Project Name:** 
**Start Date:** 
**End Date:** 
**Project Manager:** 

### Description


### Scope


## Objectives
What are we trying to achieve?

1. 
2. 
3. 

## Timeline & Milestones

### Phase 1: Planning
- **Start:** 
- **End:** 
- **Deliverables:** 

### Phase 2: Execution
- **Start:** 
- **End:** 
- **Deliverables:** 

### Phase 3: Review
- **Start:** 
- **End:** 
- **Deliverables:** 

## Team & Resources

### Team Members
- **Role:** Name - Responsibilities
- **Role:** Name - Responsibilities
- **Role:** Name - Responsibilities

### Required Resources
- 
- 
- 

## Potential Risks
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
|      |        |            |            |
|      |        |            |            |
|      |        |            |            |

## Success Metrics
How will we measure success?

1. 
2. 
3. 

## Next Actions
- [ ] 
- [ ] 
- [ ] 

`
  },
  {
    Id: 4,
    name: "Research Notes",
    description: "Organize your research findings and sources",
    icon: "BookOpen",
    color: "#42A5F5",
    category: "Academic",
    sections: [
      "Research Topic",
      "Key Questions",
      "Sources",
      "Findings",
      "Analysis"
    ],
    content: `# Research Notes

## Research Topic


## Key Questions
What am I trying to find out?

1. 
2. 
3. 

## Sources

### Primary Sources
- 
- 
- 

### Secondary Sources
- 
- 
- 

## Key Findings

### Finding 1
**Source:** 
**Summary:** 


### Finding 2
**Source:** 
**Summary:** 


### Finding 3
**Source:** 
**Summary:** 


## Analysis
What patterns or themes emerge from the research?



## Conclusions
What can I conclude from this research?



## Further Research Needed
What questions remain unanswered?

- 
- 
- 

## References
1. 
2. 
3. 

`
  },
  {
    Id: 5,
    name: "Weekly Review",
    description: "Reflect on your week and plan the next one",
    icon: "Calendar",
    color: "#FFA726",
    category: "Personal",
    sections: [
      "Week Summary",
      "Achievements",
      "Challenges",
      "Next Week Goals"
    ],
    content: `# Weekly Review - Week of ${new Date().toLocaleDateString()}

## Week Summary
How was this week overall?



## Major Achievements
What did I accomplish this week?

- 
- 
- 

## Challenges Faced
What obstacles did I encounter?



## Lessons Learned
What did I learn this week?



## Health & Wellness
How did I take care of myself?

- **Exercise:** 
- **Sleep:** 
- **Nutrition:** 
- **Mental Health:** 

## Relationships
How did I connect with others?



## Personal Growth
What did I do to grow personally or professionally?



## Time Management
How effectively did I use my time?



## Goals for Next Week

### Professional Goals
1. 
2. 
3. 

### Personal Goals
1. 
2. 
3. 

### Health Goals
1. 
2. 
3. 

## Notes for Next Week


`
  },
  {
    Id: 6,
    name: "Ideas & Brainstorming",
    description: "Capture creative ideas and brainstorm solutions",
    icon: "Lightbulb",
    color: "#E67E50",
    category: "Creative",
    sections: [
      "Challenge/Topic",
      "Initial Ideas",
      "Refined Concepts",
      "Next Steps"
    ],
    content: `# Ideas & Brainstorming

## Challenge/Topic
What problem are we trying to solve or what are we brainstorming about?



## Initial Ideas
No judgment - just capture everything that comes to mind:

- 
- 
- 
- 
- 
- 
- 
- 

## Refined Concepts
Which ideas have the most potential?

### Concept 1
**Description:** 
**Pros:** 
**Cons:** 
**Feasibility:** 

### Concept 2
**Description:** 
**Pros:** 
**Cons:** 
**Feasibility:** 

### Concept 3
**Description:** 
**Pros:** 
**Cons:** 
**Feasibility:** 

## Best Ideas
Top 3 ideas to pursue:

1. 
2. 
3. 

## Next Steps
What actions need to be taken?

- [ ] 
- [ ] 
- [ ] 

## Additional Notes


`
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const templateService = {
  async getTemplates() {
    await delay(300);
    return [...templates];
  },

  async getTemplateById(id) {
    await delay(200);
    const template = templates.find(t => t.Id === parseInt(id));
    return template ? { ...template } : null;
  }
};