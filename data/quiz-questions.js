// Comprehensive CAPM Quiz Questions Database
const quizQuestions = {
    integration: [
        {
            id: 'int_001',
            question: 'Who is responsible for formally authorizing a project by signing the Project Charter?',
            options: [
                'Project Manager',
                'Project Sponsor',
                'Stakeholders',
                'Project Team'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'The Project Sponsor is responsible for signing and authorizing the Project Charter. The Project Manager is identified in the charter but does not sign it.',
            domain: 'Integration Management'
        },
        {
            id: 'int_002',
            question: 'Which document defines how the project will be executed, monitored, and controlled?',
            options: [
                'Project Charter',
                'Business Case',
                'Project Management Plan',
                'Scope Statement'
            ],
            correct: 2,
            difficulty: 'easy',
            explanation: 'The Project Management Plan is a comprehensive document that defines how the project will be executed, monitored, controlled, and closed.',
            domain: 'Integration Management'
        },
        {
            id: 'int_003',
            question: 'What is the primary purpose of Integrated Change Control?',
            options: [
                'To prevent all changes to the project',
                'To review, approve, or reject change requests',
                'To document lessons learned',
                'To create the project charter'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'Integrated Change Control is the process of reviewing all change requests, approving changes, and managing changes to deliverables, organizational process assets, project documents, and the project management plan.',
            domain: 'Integration Management'
        },
        {
            id: 'int_004',
            question: 'How many processes are in the Integration Management knowledge area?',
            options: [
                '5 processes',
                '6 processes',
                '7 processes',
                '8 processes'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'Integration Management has 7 processes: Develop Project Charter, Develop Project Management Plan, Direct and Manage Project Work, Manage Project Knowledge, Monitor and Control Project Work, Perform Integrated Change Control, and Close Project or Phase.',
            domain: 'Integration Management'
        },
        {
            id: 'int_005',
            question: 'Which process group does "Close Project or Phase" belong to?',
            options: [
                'Initiating',
                'Planning',
                'Executing',
                'Closing'
            ],
            correct: 3,
            difficulty: 'easy',
            explanation: 'Close Project or Phase is part of the Closing process group and involves finalizing all activities across all process groups to formally close the project or phase.',
            domain: 'Integration Management'
        },
        {
            id: 'int_006',
            question: 'What is the main difference between the Project Charter and the Project Management Plan?',
            options: [
                'They are the same document',
                'Charter is high-level authorization; PM Plan is detailed execution guide',
                'Charter is created by PM; PM Plan is created by sponsor',
                'Charter is for external stakeholders only'
            ],
            correct: 1,
            difficulty: 'hard',
            explanation: 'The Project Charter is a high-level document that formally authorizes the project, while the Project Management Plan is a detailed, comprehensive document that defines how the project will be executed, monitored, and controlled.',
            domain: 'Integration Management'
        },
        {
            id: 'int_007',
            question: 'Which of the following is an output of "Develop Project Charter"?',
            options: [
                'Project Management Plan',
                'Assumption Log',
                'Change Requests',
                'Work Performance Reports'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'The outputs of Develop Project Charter are the Project Charter and the Assumption Log. The Assumption Log documents all assumptions and constraints identified during project initiation.',
            domain: 'Integration Management'
        },
        {
            id: 'int_008',
            question: 'What is the purpose of the "Manage Project Knowledge" process?',
            options: [
                'To create the project charter',
                'To use existing knowledge and create new knowledge to achieve objectives',
                'To close the project',
                'To approve change requests'
            ],
            correct: 1,
            difficulty: 'hard',
            explanation: 'Manage Project Knowledge involves using existing organizational knowledge and creating new knowledge to achieve project objectives and contribute to organizational learning.',
            domain: 'Integration Management'
        }
    ],
    
    risk: [
        {
            id: 'risk_001',
            question: 'What is the difference between a threat and an opportunity in risk management?',
            options: [
                'There is no difference',
                'Threat is negative risk; Opportunity is positive risk',
                'Threat is certain; Opportunity is uncertain',
                'Threat affects cost; Opportunity affects schedule'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'In risk management, a threat is a negative risk that could harm the project if it occurs, while an opportunity is a positive risk that could benefit the project.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_002',
            question: 'Which risk response strategy involves eliminating the threat by removing its cause?',
            options: [
                'Mitigate',
                'Transfer',
                'Avoid',
                'Accept'
            ],
            correct: 2,
            difficulty: 'easy',
            explanation: 'Avoid is the risk response strategy that eliminates the threat entirely by removing the cause or changing the project plan to eliminate the risk.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_003',
            question: 'What is the formula for Expected Monetary Value (EMV)?',
            options: [
                'Impact ÷ Probability',
                'Probability × Impact',
                'Impact - Probability',
                'Probability + Impact'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'Expected Monetary Value (EMV) is calculated by multiplying the probability of the risk occurring by its monetary impact: EMV = Probability × Impact.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_004',
            question: 'In which process is the Risk Register created?',
            options: [
                'Plan Risk Management',
                'Identify Risks',
                'Perform Qualitative Risk Analysis',
                'Plan Risk Responses'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'The Risk Register is created as an output of the Identify Risks process. It is then updated throughout the other risk management processes.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_005',
            question: 'What is a residual risk?',
            options: [
                'A risk that has been eliminated',
                'A risk that remains after risk response planning',
                'A new risk created by a risk response',
                'A risk that was not identified'
            ],
            correct: 1,
            difficulty: 'hard',
            explanation: 'Residual risks are risks that remain after risk response strategies have been implemented. They are expected and accepted risks that cannot be completely eliminated.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_006',
            question: 'What is a secondary risk?',
            options: [
                'A low-priority risk',
                'A risk that occurs after project completion',
                'A NEW risk created as a result of implementing a risk response',
                'A risk identified in the second iteration'
            ],
            correct: 2,
            difficulty: 'hard',
            explanation: 'Secondary risks are NEW risks that arise as a direct result of implementing a risk response. For example, outsourcing to avoid a risk might create a new risk of vendor dependency.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_007',
            question: 'Which analysis should be performed first: Qualitative or Quantitative Risk Analysis?',
            options: [
                'Quantitative first',
                'Qualitative first',
                'They can be done in any order',
                'Neither is required'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'Qualitative Risk Analysis should be performed before Quantitative Risk Analysis. Qualitative analysis prioritizes risks, and then quantitative analysis provides numerical analysis of the highest priority risks.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_008',
            question: 'What is the risk response strategy for opportunities that is equivalent to "Avoid" for threats?',
            options: [
                'Enhance',
                'Share',
                'Exploit',
                'Accept'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'Exploit is the opportunity response strategy equivalent to Avoid for threats. It ensures that the opportunity definitely happens by eliminating uncertainty.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_009',
            question: 'A project has a 40% chance of a $15,000 cost overrun. What is the EMV?',
            options: [
                '$6,000',
                '$15,000',
                '$37,500',
                '$60,000'
            ],
            correct: 0,
            difficulty: 'hard',
            explanation: 'EMV = Probability × Impact = 0.40 × $15,000 = $6,000. This represents the expected value of the risk.',
            domain: 'Risk Management'
        },
        {
            id: 'risk_010',
            question: 'What is the difference between contingency reserve and management reserve?',
            options: [
                'No difference',
                'Contingency is for known unknowns; Management is for unknown unknowns',
                'Contingency is larger than management reserve',
                'Management reserve is part of the project budget'
            ],
            correct: 1,
            difficulty: 'hard',
            explanation: 'Contingency Reserve is for identified risks (known unknowns) and is part of the cost baseline. Management Reserve is for unidentified risks (unknown unknowns) and is NOT part of the cost baseline.',
            domain: 'Risk Management'
        }
    ],
    
    scope: [
        {
            id: 'scope_001',
            question: 'What is the primary purpose of the Scope Management Plan?',
            options: [
                'To define the project scope',
                'To describe how scope will be defined, validated, and controlled',
                'To list all project deliverables',
                'To create the WBS'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'The Scope Management Plan describes how the project scope will be defined, developed, monitored, controlled, and validated. It does not define the actual scope.',
            domain: 'Scope Management'
        },
        {
            id: 'scope_002',
            question: 'What does WBS stand for?',
            options: [
                'Work Breakdown Structure',
                'Work Building System',
                'Weekly Business Schedule',
                'Work Budget Statement'
            ],
            correct: 0,
            difficulty: 'easy',
            explanation: 'WBS stands for Work Breakdown Structure. It is a hierarchical decomposition of the total scope of work to be carried out by the project team.',
            domain: 'Scope Management'
        },
        {
            id: 'scope_003',
            question: 'What is scope creep?',
            options: [
                'Planned scope changes',
                'Uncontrolled expansion of project scope without adjustments to time, cost, and resources',
                'Normal project evolution',
                'Scope reduction'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'Scope creep is the uncontrolled expansion or addition of features or functions without corresponding adjustments to time, cost, and resources.',
            domain: 'Scope Management'
        },
        {
            id: 'scope_004',
            question: 'Which process involves obtaining formal acceptance of completed deliverables?',
            options: [
                'Control Scope',
                'Define Scope',
                'Validate Scope',
                'Create WBS'
            ],
            correct: 2,
            difficulty: 'medium',
            explanation: 'Validate Scope is the process of formalizing acceptance of the completed project deliverables. It involves the customer or sponsor reviewing and accepting deliverables.',
            domain: 'Scope Management'
        }
    ],
    
    schedule: [
        {
            id: 'sched_001',
            question: 'What is the Critical Path in project scheduling?',
            options: [
                'The shortest path through the project',
                'The longest path through the project with zero float',
                'The most important tasks',
                'The path with the most resources'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'The Critical Path is the longest sequence of activities in a project schedule that determines the shortest possible project duration. Activities on the critical path have zero float.',
            domain: 'Schedule Management'
        },
        {
            id: 'sched_002',
            question: 'What does "float" or "slack" mean in scheduling?',
            options: [
                'Extra resources available',
                'The amount of time an activity can be delayed without delaying the project',
                'Buffer time added to all activities',
                'Time saved by fast-tracking'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'Float (or slack) is the amount of time that an activity can be delayed without delaying the project end date or violating a schedule constraint.',
            domain: 'Schedule Management'
        },
        {
            id: 'sched_003',
            question: 'What is the difference between fast-tracking and crashing?',
            options: [
                'No difference',
                'Fast-tracking does activities in parallel; Crashing adds resources',
                'Fast-tracking is cheaper than crashing',
                'Crashing is always better'
            ],
            correct: 1,
            difficulty: 'hard',
            explanation: 'Fast-tracking involves performing activities in parallel that were originally planned in sequence. Crashing involves adding resources to shorten the schedule. Fast-tracking increases risk; crashing increases cost.',
            domain: 'Schedule Management'
        }
    ],
    
    cost: [
        {
            id: 'cost_001',
            question: 'What does EV stand for in Earned Value Management?',
            options: [
                'Expected Value',
                'Earned Value',
                'Estimated Value',
                'Extra Value'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'EV stands for Earned Value, which represents the value of work actually completed at a given point in time.',
            domain: 'Cost Management'
        },
        {
            id: 'cost_002',
            question: 'If CPI (Cost Performance Index) is 0.85, what does this indicate?',
            options: [
                'Project is under budget',
                'Project is over budget',
                'Project is on budget',
                'Cannot determine'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'A CPI of 0.85 means the project is getting $0.85 worth of work for every $1 spent, indicating the project is over budget. CPI < 1.0 means over budget.',
            domain: 'Cost Management'
        },
        {
            id: 'cost_003',
            question: 'What is the formula for Cost Variance (CV)?',
            options: [
                'CV = EV - AC',
                'CV = AC - EV',
                'CV = PV - EV',
                'CV = EV / AC'
            ],
            correct: 0,
            difficulty: 'medium',
            explanation: 'Cost Variance (CV) = Earned Value (EV) - Actual Cost (AC). A positive CV indicates under budget; negative CV indicates over budget.',
            domain: 'Cost Management'
        }
    ],
    
    quality: [
        {
            id: 'qual_001',
            question: 'What is the difference between Quality Assurance and Quality Control?',
            options: [
                'No difference',
                'QA is process-oriented; QC is product-oriented',
                'QC is more important than QA',
                'QA is done after QC'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'Quality Assurance (QA) is process-oriented and focuses on preventing defects. Quality Control (QC) is product-oriented and focuses on identifying defects in deliverables.',
            domain: 'Quality Management'
        },
        {
            id: 'qual_002',
            question: 'What does the term "Gold Plating" mean in project management?',
            options: [
                'Using expensive materials',
                'Adding extra features not in the scope',
                'High-quality deliverables',
                'Premium pricing'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'Gold plating refers to adding extra features or functionality that were not requested or included in the project scope. This is generally considered wasteful.',
            domain: 'Quality Management'
        }
    ],
    
    resource: [
        {
            id: 'res_001',
            question: 'What is a RACI chart used for?',
            options: [
                'Risk assessment',
                'Defining roles and responsibilities',
                'Cost estimation',
                'Schedule planning'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'A RACI chart (Responsible, Accountable, Consulted, Informed) is used to define and communicate roles and responsibilities for project activities.',
            domain: 'Resource Management'
        },
        {
            id: 'res_002',
            question: 'According to Tuckman\'s model, what are the five stages of team development?',
            options: [
                'Start, Build, Perform, Deliver, Close',
                'Forming, Storming, Norming, Performing, Adjourning',
                'Plan, Execute, Monitor, Control, Close',
                'Initiate, Plan, Build, Test, Deploy'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'Tuckman\'s model identifies five stages: Forming (team comes together), Storming (conflicts arise), Norming (team establishes norms), Performing (team works effectively), and Adjourning (team disbands).',
            domain: 'Resource Management'
        }
    ],
    
    communication: [
        {
            id: 'comm_001',
            question: 'What is the formula for calculating the number of communication channels?',
            options: [
                'n × (n - 1)',
                'n × (n - 1) / 2',
                'n²',
                'n + (n - 1)'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'The formula for communication channels is n × (n - 1) / 2, where n is the number of stakeholders. For example, with 5 people: 5 × 4 / 2 = 10 channels.',
            domain: 'Communication Management'
        },
        {
            id: 'comm_002',
            question: 'How many communication channels exist in a project with 6 stakeholders?',
            options: [
                '12',
                '15',
                '18',
                '30'
            ],
            correct: 1,
            difficulty: 'hard',
            explanation: 'Using the formula n × (n - 1) / 2: 6 × 5 / 2 = 15 communication channels.',
            domain: 'Communication Management'
        }
    ],
    
    procurement: [
        {
            id: 'proc_001',
            question: 'What is the difference between a Fixed Price contract and a Cost Reimbursable contract?',
            options: [
                'No difference',
                'Fixed Price has set price; Cost Reimbursable reimburses actual costs',
                'Fixed Price is always better',
                'Cost Reimbursable is illegal'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'Fixed Price contracts have a set price regardless of actual costs (risk to seller). Cost Reimbursable contracts reimburse the seller for actual costs plus a fee (risk to buyer).',
            domain: 'Procurement Management'
        },
        {
            id: 'proc_002',
            question: 'Who bears more risk in a Fixed Price contract?',
            options: [
                'Buyer',
                'Seller',
                'Both equally',
                'Neither'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'In a Fixed Price contract, the seller bears more risk because they must deliver the work for the agreed price, even if costs exceed expectations.',
            domain: 'Procurement Management'
        }
    ],
    
    stakeholder: [
        {
            id: 'stake_001',
            question: 'What is a stakeholder?',
            options: [
                'Only the project sponsor',
                'Anyone who can affect or be affected by the project',
                'Only team members',
                'Only customers'
            ],
            correct: 1,
            difficulty: 'easy',
            explanation: 'A stakeholder is any individual, group, or organization that can affect, be affected by, or perceive itself to be affected by a decision, activity, or outcome of a project.',
            domain: 'Stakeholder Management'
        },
        {
            id: 'stake_002',
            question: 'What is the purpose of a Stakeholder Register?',
            options: [
                'To track project costs',
                'To document stakeholder information, assessment, and classification',
                'To schedule meetings',
                'To assign tasks'
            ],
            correct: 1,
            difficulty: 'medium',
            explanation: 'The Stakeholder Register documents information about identified stakeholders including their assessment, classification, and how they should be managed.',
            domain: 'Stakeholder Management'
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = quizQuestions;
}

// Made with Bob
