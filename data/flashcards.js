// Comprehensive CAPM Flashcards Database
const flashcards = {
    integration: [
        {
            id: 'int_fc_001',
            front: 'What is a Project Charter?',
            back: 'A document issued by the project sponsor that formally authorizes the existence of a project and provides the project manager with the authority to apply organizational resources to project activities.',
            category: 'Key Documents',
            domain: 'Integration Management'
        },
        {
            id: 'int_fc_002',
            front: 'What is the Project Management Plan?',
            back: 'A comprehensive document that defines how the project will be executed, monitored, controlled, and closed. It integrates and consolidates all subsidiary plans and baselines.',
            category: 'Key Documents',
            domain: 'Integration Management'
        },
        {
            id: 'int_fc_003',
            front: 'Who signs the Project Charter?',
            back: 'The Project Sponsor (or initiator/customer). The Project Manager is identified in the charter but does not sign it.',
            category: 'Roles & Responsibilities',
            domain: 'Integration Management'
        },
        {
            id: 'int_fc_004',
            front: 'What is Integrated Change Control?',
            back: 'The process of reviewing all change requests, approving changes, and managing changes to deliverables, organizational process assets, project documents, and the project management plan.',
            category: 'Processes',
            domain: 'Integration Management'
        },
        {
            id: 'int_fc_005',
            front: 'What is a Change Control Board (CCB)?',
            back: 'A formally chartered group responsible for reviewing, evaluating, approving, delaying, or rejecting changes to the project, and for recording and communicating such decisions.',
            category: 'Key Terms',
            domain: 'Integration Management'
        },
        {
            id: 'int_fc_006',
            front: 'List the 7 Integration Management Processes',
            back: '1. Develop Project Charter\n2. Develop Project Management Plan\n3. Direct and Manage Project Work\n4. Manage Project Knowledge\n5. Monitor and Control Project Work\n6. Perform Integrated Change Control\n7. Close Project or Phase',
            category: 'Processes',
            domain: 'Integration Management'
        },
        {
            id: 'int_fc_007',
            front: 'What is the Assumption Log?',
            back: 'A project document used to record all assumptions and constraints throughout the project lifecycle. It is created during Develop Project Charter.',
            category: 'Key Documents',
            domain: 'Integration Management'
        },
        {
            id: 'int_fc_008',
            front: 'What are Lessons Learned?',
            back: 'Knowledge gained during a project which shows how project events were addressed or should be addressed in the future for the purpose of improving future performance.',
            category: 'Key Terms',
            domain: 'Integration Management'
        }
    ],
    
    risk: [
        {
            id: 'risk_fc_001',
            front: 'What is a Risk?',
            back: 'An uncertain event or condition that, if it occurs, has a positive or negative effect on one or more project objectives.',
            category: 'Key Terms',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_002',
            front: 'What is a Threat?',
            back: 'A negative risk - an uncertain event that could harm the project if it occurs.',
            category: 'Key Terms',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_003',
            front: 'What is an Opportunity?',
            back: 'A positive risk - an uncertain event that could benefit the project if it occurs.',
            category: 'Key Terms',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_004',
            front: 'List the 5 Threat Response Strategies',
            back: '1. AVOID - Eliminate the threat\n2. MITIGATE - Reduce probability or impact\n3. TRANSFER - Shift impact to third party\n4. ACCEPT - Acknowledge but take no action\n5. ESCALATE - Outside project scope',
            category: 'Strategies',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_005',
            front: 'List the 5 Opportunity Response Strategies',
            back: '1. EXPLOIT - Ensure it happens\n2. ENHANCE - Increase probability or impact\n3. SHARE - Allocate to third party\n4. ACCEPT - Take advantage if it occurs\n5. ESCALATE - Outside project scope',
            category: 'Strategies',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_006',
            front: 'Expected Monetary Value (EMV) Formula',
            back: 'EMV = Probability × Impact\n\nExample: 30% chance of $10,000 loss\nEMV = 0.30 × $10,000 = $3,000',
            category: 'Formulas',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_007',
            front: 'What is a Residual Risk?',
            back: 'A risk that remains after risk response strategies have been implemented. These are expected and accepted risks.',
            category: 'Key Terms',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_008',
            front: 'What is a Secondary Risk?',
            back: 'A NEW risk that arises as a direct result of implementing a risk response. Example: Outsourcing to avoid a risk creates vendor dependency risk.',
            category: 'Key Terms',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_009',
            front: 'What is the Risk Register?',
            back: 'A document that contains the results of risk analysis and risk response planning. Created in Identify Risks process.',
            category: 'Key Documents',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_010',
            front: 'Qualitative vs Quantitative Risk Analysis',
            back: 'QUALITATIVE: Prioritizes risks by probability and impact (subjective)\n\nQUANTITATIVE: Numerically analyzes effect of risks (objective, uses numbers)\n\nQualitative comes FIRST!',
            category: 'Processes',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_011',
            front: 'Contingency Reserve vs Management Reserve',
            back: 'CONTINGENCY RESERVE:\n- For identified risks (known unknowns)\n- Part of cost baseline\n- Requires change request to use\n\nMANAGEMENT RESERVE:\n- For unidentified risks (unknown unknowns)\n- NOT part of cost baseline\n- No change request needed',
            category: 'Key Terms',
            domain: 'Risk Management'
        },
        {
            id: 'risk_fc_012',
            front: 'What is Risk Appetite?',
            back: 'The degree of uncertainty an organization or individual is willing to accept in anticipation of a reward.',
            category: 'Key Terms',
            domain: 'Risk Management'
        }
    ],
    
    scope: [
        {
            id: 'scope_fc_001',
            front: 'What is Project Scope?',
            back: 'The work performed to deliver a product, service, or result with the specified features and functions.',
            category: 'Key Terms',
            domain: 'Scope Management'
        },
        {
            id: 'scope_fc_002',
            front: 'What is Product Scope?',
            back: 'The features and functions that characterize a product, service, or result.',
            category: 'Key Terms',
            domain: 'Scope Management'
        },
        {
            id: 'scope_fc_003',
            front: 'What is a Work Breakdown Structure (WBS)?',
            back: 'A hierarchical decomposition of the total scope of work to be carried out by the project team to accomplish the project objectives and create the required deliverables.',
            category: 'Key Terms',
            domain: 'Scope Management'
        },
        {
            id: 'scope_fc_004',
            front: 'What is Scope Creep?',
            back: 'The uncontrolled expansion of product or project scope without adjustments to time, cost, and resources.',
            category: 'Key Terms',
            domain: 'Scope Management'
        },
        {
            id: 'scope_fc_005',
            front: 'What is a Work Package?',
            back: 'The lowest level of the WBS. It is the work defined at the lowest level of the WBS for which cost and duration can be estimated and managed.',
            category: 'Key Terms',
            domain: 'Scope Management'
        },
        {
            id: 'scope_fc_006',
            front: 'Validate Scope vs Control Quality',
            back: 'VALIDATE SCOPE:\n- Acceptance of deliverables\n- Done by customer/sponsor\n- Focuses on correctness\n\nCONTROL QUALITY:\n- Correctness of deliverables\n- Done by project team\n- Focuses on quality standards',
            category: 'Processes',
            domain: 'Scope Management'
        }
    ],
    
    schedule: [
        {
            id: 'sched_fc_001',
            front: 'What is the Critical Path?',
            back: 'The longest sequence of activities in a project schedule that determines the shortest possible project duration. Activities on the critical path have zero float.',
            category: 'Key Terms',
            domain: 'Schedule Management'
        },
        {
            id: 'sched_fc_002',
            front: 'What is Float (Slack)?',
            back: 'The amount of time that a schedule activity can be delayed without delaying the early start date of any successor or violating a schedule constraint.',
            category: 'Key Terms',
            domain: 'Schedule Management'
        },
        {
            id: 'sched_fc_003',
            front: 'Fast-Tracking vs Crashing',
            back: 'FAST-TRACKING:\n- Perform activities in parallel\n- Increases risk\n- No additional cost\n\nCRASHING:\n- Add resources to shorten duration\n- Increases cost\n- May not always work',
            category: 'Techniques',
            domain: 'Schedule Management'
        },
        {
            id: 'sched_fc_004',
            front: 'What is a Milestone?',
            back: 'A significant point or event in a project. Milestones have zero duration and represent the completion of a major deliverable or phase.',
            category: 'Key Terms',
            domain: 'Schedule Management'
        },
        {
            id: 'sched_fc_005',
            front: 'What is Lead Time?',
            back: 'The amount of time a successor activity can be advanced with respect to a predecessor activity. Example: Start painting 2 days before finishing carpentry.',
            category: 'Key Terms',
            domain: 'Schedule Management'
        },
        {
            id: 'sched_fc_006',
            front: 'What is Lag Time?',
            back: 'The amount of time a successor activity must be delayed with respect to a predecessor activity. Example: Wait 3 days after painting before moving furniture.',
            category: 'Key Terms',
            domain: 'Schedule Management'
        }
    ],
    
    cost: [
        {
            id: 'cost_fc_001',
            front: 'Earned Value (EV)',
            back: 'The measure of work performed expressed in terms of the budget authorized for that work. Also called Budgeted Cost of Work Performed (BCWP).',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_002',
            front: 'Planned Value (PV)',
            back: 'The authorized budget assigned to scheduled work. Also called Budgeted Cost of Work Scheduled (BCWS).',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_003',
            front: 'Actual Cost (AC)',
            back: 'The realized cost incurred for the work performed on an activity during a specific time period. Also called Actual Cost of Work Performed (ACWP).',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_004',
            front: 'Cost Variance (CV) Formula',
            back: 'CV = EV - AC\n\nPositive CV = Under budget (good)\nNegative CV = Over budget (bad)\nCV = 0 = On budget',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_005',
            front: 'Schedule Variance (SV) Formula',
            back: 'SV = EV - PV\n\nPositive SV = Ahead of schedule (good)\nNegative SV = Behind schedule (bad)\nSV = 0 = On schedule',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_006',
            front: 'Cost Performance Index (CPI) Formula',
            back: 'CPI = EV / AC\n\nCPI > 1.0 = Under budget (good)\nCPI < 1.0 = Over budget (bad)\nCPI = 1.0 = On budget',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_007',
            front: 'Schedule Performance Index (SPI) Formula',
            back: 'SPI = EV / PV\n\nSPI > 1.0 = Ahead of schedule (good)\nSPI < 1.0 = Behind schedule (bad)\nSPI = 1.0 = On schedule',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_008',
            front: 'Budget at Completion (BAC)',
            back: 'The sum of all budgets established for the work to be performed. The total planned value for the project.',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_009',
            front: 'Estimate at Completion (EAC) Formula',
            back: 'EAC = BAC / CPI\n\n(Most common formula - assumes current performance continues)',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_010',
            front: 'Estimate to Complete (ETC) Formula',
            back: 'ETC = EAC - AC\n\n(How much more money is needed to complete the project)',
            category: 'Formulas',
            domain: 'Cost Management'
        },
        {
            id: 'cost_fc_011',
            front: 'Variance at Completion (VAC) Formula',
            back: 'VAC = BAC - EAC\n\nPositive VAC = Under budget at completion\nNegative VAC = Over budget at completion',
            category: 'Formulas',
            domain: 'Cost Management'
        }
    ],
    
    quality: [
        {
            id: 'qual_fc_001',
            front: 'Quality vs Grade',
            back: 'QUALITY: Degree to which characteristics fulfill requirements\n\nGRADE: Category assigned to products with same functional use but different technical characteristics\n\nLow quality is always a problem. Low grade may not be.',
            category: 'Key Terms',
            domain: 'Quality Management'
        },
        {
            id: 'qual_fc_002',
            front: 'Quality Assurance vs Quality Control',
            back: 'QUALITY ASSURANCE (QA):\n- Process-oriented\n- Prevents defects\n- Executing process group\n\nQUALITY CONTROL (QC):\n- Product-oriented\n- Identifies defects\n- Monitoring & Controlling group',
            category: 'Processes',
            domain: 'Quality Management'
        },
        {
            id: 'qual_fc_003',
            front: 'What is Gold Plating?',
            back: 'Adding extra features or functionality that were not requested or included in the project scope. This is wasteful and should be avoided.',
            category: 'Key Terms',
            domain: 'Quality Management'
        },
        {
            id: 'qual_fc_004',
            front: 'What is Prevention over Inspection?',
            back: 'It is better (and cheaper) to prevent errors than to inspect and correct them. Quality should be planned in, not inspected in.',
            category: 'Key Concepts',
            domain: 'Quality Management'
        }
    ],
    
    resource: [
        {
            id: 'res_fc_001',
            front: 'What is a RACI Chart?',
            back: 'A responsibility assignment matrix that defines roles:\n\nR = Responsible (does the work)\nA = Accountable (approves/signs off)\nC = Consulted (provides input)\nI = Informed (kept updated)',
            category: 'Tools',
            domain: 'Resource Management'
        },
        {
            id: 'res_fc_002',
            front: 'Tuckman\'s 5 Stages of Team Development',
            back: '1. FORMING - Team comes together\n2. STORMING - Conflicts arise\n3. NORMING - Team establishes norms\n4. PERFORMING - Team works effectively\n5. ADJOURNING - Team disbands',
            category: 'Key Concepts',
            domain: 'Resource Management'
        },
        {
            id: 'res_fc_003',
            front: 'Maslow\'s Hierarchy of Needs',
            back: 'From bottom to top:\n1. Physiological (food, water)\n2. Safety (security, stability)\n3. Social (belonging, love)\n4. Esteem (recognition, status)\n5. Self-Actualization (growth, potential)',
            category: 'Key Concepts',
            domain: 'Resource Management'
        },
        {
            id: 'res_fc_004',
            front: 'Theory X vs Theory Y (McGregor)',
            back: 'THEORY X:\n- People dislike work\n- Need to be controlled\n- Avoid responsibility\n\nTHEORY Y:\n- People enjoy work\n- Self-directed\n- Seek responsibility',
            category: 'Key Concepts',
            domain: 'Resource Management'
        }
    ],
    
    communication: [
        {
            id: 'comm_fc_001',
            front: 'Communication Channels Formula',
            back: 'n × (n - 1) / 2\n\nWhere n = number of stakeholders\n\nExample: 5 people = 5 × 4 / 2 = 10 channels',
            category: 'Formulas',
            domain: 'Communication Management'
        },
        {
            id: 'comm_fc_002',
            front: 'Types of Communication',
            back: 'FORMAL WRITTEN: Reports, memos\nFORMAL VERBAL: Presentations, speeches\nINFORMAL WRITTEN: Emails, notes\nINFORMAL VERBAL: Conversations, meetings',
            category: 'Key Concepts',
            domain: 'Communication Management'
        },
        {
            id: 'comm_fc_003',
            front: 'Communication Methods',
            back: 'INTERACTIVE: Real-time, two-way (meetings, calls)\n\nPUSH: Sent to recipients (emails, reports)\n\nPULL: Recipients access as needed (websites, repositories)',
            category: 'Key Concepts',
            domain: 'Communication Management'
        }
    ],
    
    procurement: [
        {
            id: 'proc_fc_001',
            front: 'Fixed Price Contract',
            back: 'Set price regardless of actual costs.\n\nRISK: Seller bears the risk\nBEST FOR: Well-defined scope\nBUYER: Low risk, less involvement',
            category: 'Contract Types',
            domain: 'Procurement Management'
        },
        {
            id: 'proc_fc_002',
            front: 'Cost Reimbursable Contract',
            back: 'Reimburse seller for actual costs plus fee.\n\nRISK: Buyer bears the risk\nBEST FOR: Uncertain scope\nBUYER: High risk, more involvement',
            category: 'Contract Types',
            domain: 'Procurement Management'
        },
        {
            id: 'proc_fc_003',
            front: 'Time & Materials (T&M) Contract',
            back: 'Hybrid of fixed price and cost reimbursable.\n\nPay for time and materials used.\nRISK: Shared between buyer and seller\nBEST FOR: Small, short-term work',
            category: 'Contract Types',
            domain: 'Procurement Management'
        },
        {
            id: 'proc_fc_004',
            front: 'Make-or-Buy Analysis',
            back: 'Process of determining whether to produce internally or purchase from external sources.\n\nConsider: Cost, capacity, expertise, risk, time',
            category: 'Key Concepts',
            domain: 'Procurement Management'
        }
    ],
    
    stakeholder: [
        {
            id: 'stake_fc_001',
            front: 'What is a Stakeholder?',
            back: 'An individual, group, or organization that may affect, be affected by, or perceive itself to be affected by a decision, activity, or outcome of a project.',
            category: 'Key Terms',
            domain: 'Stakeholder Management'
        },
        {
            id: 'stake_fc_002',
            front: 'Power/Interest Grid',
            back: 'HIGH POWER, HIGH INTEREST: Manage Closely\nHIGH POWER, LOW INTEREST: Keep Satisfied\nLOW POWER, HIGH INTEREST: Keep Informed\nLOW POWER, LOW INTEREST: Monitor',
            category: 'Tools',
            domain: 'Stakeholder Management'
        },
        {
            id: 'stake_fc_003',
            front: 'What is Stakeholder Engagement?',
            back: 'The process of communicating and working with stakeholders to meet their needs and expectations, address issues, and foster appropriate stakeholder involvement.',
            category: 'Key Concepts',
            domain: 'Stakeholder Management'
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = flashcards;
}

// Made with Bob
