


.brand h2 {
    margin: 0;
    font-family: "Space Grotesk", sans-serif;
    font-size: 19px;
}

.brand span {
    display: block;
    margin-top: 4px;
    color: #a7b0c4;
    font-size: 11px;
}

.nav-label, .eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.3px;
}

.nav-label {
    padding: 0 12px 12px;
    color: #8290aa;
}

.nav-link {
    display: block;
    margin-bottom: 6px;
    padding: 13px 12px;
    border-radius: 9px;
    color: #b9c2d4;
    text-decoration: none;
    font-size: 13px;
}

.nav-link:hover, .nav-link.active {
    background: #25314a;
    color: #ffffff;
}

.nav-link.active {
    box-shadow: inset 3px 0 #8290ff;
}

.sidebar-bottom {
    margin-top: auto;
    padding: 17px 10px 0;
    border-top: 1px solid #2b364b;
    color: #aab4c8;
    font-size: 11px;
}

.status-dot, .system-status span {
    display: inline-block;
    width: 7px;
    height: 7px;
    margin-right: 6px;
    border-radius: 50%;
    background: #40c99a;
}

.sidebar-bottom p {
    margin-top: 18px;
    color: #7e8ba4;
}

.main-content {
    max-width: 1800px;
    margin-left: 250px;
    padding: 34px 38px;
}

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 30px;
}

.eyebrow {
    margin: 0 0 9px;
    color: var(--blue);
}

h1, h2, h3, p {
    overflow-wrap: anywhere;
}

h1, h2, h3 {
    font-family: "Space Grotesk", sans-serif;
}

h1 {
    margin: 0;
    font-size: clamp(24px, 2.4vw, 32px);
    letter-spacing: -1px;
}

.subtitle, .panel-description {
    color: var(--muted);
    line-height: 1.65;
}

.subtitle {
    margin: 9px 0 0;
}

.topbar-right {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
}

.system-status {
    color: #566278;
    white-space: nowrap;
    font-size: 12px;
}

.btn {
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 11px 15px;
    font-weight: 600;
    font-size: 12px;
}

.btn-primary {
    background: var(--blue);
    color: white;
}

.btn-primary:hover {
    background: #4054d5;
    transform: translateY(-1px);
}

.btn-outline {
    border-color: #dfe3ed;
    background: #ffffff;
    color: #354057;
}

.btn-outline:hover {
    border-color: var(--blue);
    color: var(--blue);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 17px;
    margin-bottom: 22px;
}

.stat-card, .panel {
    border: 1px solid var(--border);
    border-radius: 13px;
    background: var(--panel);
    box-shadow: 0 3px 14px rgb(27 42 75 / 3%);
}

.stat-card {
    padding: 21px;
}

.stat-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    color: #67738a;
    font-size: 12px;
}

.stat-icon {
    display: grid;
    place-items: center;
    width: 35px;
    height: 35px;
    border-radius: 9px;
    font-size: 17px;
}

.blue { background: #e9edff; color: #5269ed; }
.purple { background: #f0e9ff; color: #8a59cf; }
.orange { background: #fff1dc; color: #cb8523; }
.red { background: #ffeaec; color: #d94753; }

.stat-card h2 {
    margin: 15px 0 5px;
    font-size: 31px;
    letter-spacing: -1px;
}

.stat-card p {
    margin: 0;
    color: #929bad;
    font-size: 11px;
}

.content-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 20px;
    margin-bottom: 22px;
}

.panel {
    min-width: 0;
    padding: 24px;
}

.panel-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.panel-heading h2 {
    margin: 0;
    font-size: 19px;
    letter-spacing: -0.5px;
}

.panel-heading .eyebrow {
    margin-bottom: 7px;
}

.panel-description {
    margin: 10px 0 22px;
    font-size: 12px;
}

.step-number, .live-tag, .record-label {
    flex-shrink: 0;
    border-radius: 7px;
    padding: 7px 9px;
    background: #f0f2ff;
    color: var(--blue);
    font-size: 10px;
    font-weight: 700;
}

.live-tag {
    background: #e8f7f0;
    color: var(--green);
    letter-spacing: 0.5px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 17px;
}

.field label {
    color: #465169;
    font-size: 12px;
    font-weight: 600;
}

.field input, .field select, .field textarea,
.table-controls input, .table-controls select {
    width: 100%;
    min-width: 0;
    border: 1px solid #e0e5ef;
    border-radius: 8px;
    outline: none;
    background: #ffffff;
    color: #253047;
    padding: 12px;
    font-size: 12px;
}

.field textarea {
    resize: vertical;
    line-height: 1.5;
}

.field input:focus, .field select:focus, .field textarea:focus,
.table-controls input:focus, .table-controls select:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px rgb(82 105 237 / 10%);
}

.field input::placeholder, .field textarea::placeholder {
    color: #a3acbc;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 13px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.form-message {
    min-height: 18px;
    margin-bottom: 0;
    font-size: 12px;
    color: var(--green);
}

.form-message.error {
    color: var(--red);
}

.analysis-highlight {
    display: flex;
    gap: 13px;
    padding: 18px;
    border: 1px solid #e6e9ff;
    border-radius: 10px;
    background: linear-gradient(120deg, #f4f5ff, #fafaff);
}

.highlight-icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #e2e6ff;
    color: var(--blue);
    font-size: 24px;
}

.analysis-highlight h3 {
    margin: 1px 0 6px;
    font-size: 14px;
}

.analysis-highlight p {
    margin: 0;
    color: #737f95;
    font-size: 11px;
    line-height: 1.6;
}

.signal-list {
    margin-top: 13px;
}

.signal-row, .signal-info {
    display: flex;
    align-items: center;
}

.signal-row {
    justify-content: space-between;
    gap: 10px;
    padding: 15px 2px;
    border-bottom: 1px solid #edf0f5;
}

.signal-info {
    gap: 11px;
}

.signal-info strong {
    display: block;
    font-size: 12px;
}

.signal-info small {
    display: block;
    margin-top: 4px;
    color: var(--muted);
    font-size: 10px;
}

.signal-row > strong {
    font-size: 14px;
}

.signal-marker, .legend-dot {
    display: inline-block;
    flex-shrink: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
}

.red-marker { background: var(--red); }
.orange-marker { background: var(--orange); }
.blue-marker { background: var(--blue); }

.notice {
    margin-top: 19px;
    padding: 13px;
    border: 1px solid #f5e4be;
    border-radius: 8px;
    background: #fffaf0;
    color: #8a6a31;
    font-size: 10px;
    line-height: 1.7;
}

.records-panel {
    margin-bottom: 22px;
}

.record-label {
    background: #f3f5f9;
    color: #657087;
}

.table-controls {
    display: flex;
    gap: 12px;
    margin-bottom: 18px;
}

.table-controls input {
    max-width: 420px;
}

.table-controls select {
    width: 165px;
}

.table-wrap {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    white-space: nowrap;
}

thead {
    background: #f8f9fc;
}

th {
    padding: 13px 12px;
    color: #758096;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

td {
    padding: 15px 12px;
    border-bottom: 1px solid #edf0f5;
    color: #59657a;
    font-size: 11px;
}

tbody tr:hover {
    background: #fafbff;
}

.case-cell strong, .case-cell small {
    display: block;
}

.case-cell strong {
    color: #27334a;
    font-size: 11px;
}

.case-cell small {
    margin-top: 4px;
    color: #99a2b2;
}

.evidence-type {
    display: inline-block;
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px 7px;
    background: #eef0ff;
    color: #5269ed;
    font-size: 10px;
}

.value-cell {
    display: block;
    max-width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.risk-pill, .status-pill {
    display: inline-block;
    border-radius: 20px;
    padding: 6px 9px;
    font-size: 10px;
    font-weight: 700;
}

.risk-high { background: #ffeaec; color: #c53644; }
.risk-medium { background: #fff1db; color: #aa6c17; }
.risk-low { background: #e7f6ee; color: #267a59; }
.status-duplicate { background: #f1eaff; color: #7c4db1; }
.status-review { background: #fff1db; color: #aa6c17; }
.status-normal { background: #e7f6ee; color: #267a59; }

.visual-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
    gap: 20px;
}

.graph-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 15px;
    color: #69758b;
    font-size: 10px;
}

.graph-legend span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.case-dot { background: #6679ef; }
.evidence-dot { background: #31a888; }
.shared-dot { background: #e5a03e; }

.graph-container {
    display: grid;
    place-items: center;
    min-height: 320px;
    overflow: hidden;
    border: 1px solid #edf0f5;
    border-radius: 10px;
    background-color: #fafbfe;
    background-image: radial-gradient(#dfe4f0 1px, transparent 1px);
    background-size: 19px 19px;
}

.graph-container svg {
    display: block;
    width: 100%;
    height: 320px;
}

.graph-caption {
    margin: 12px 0 0;
    color: #9099aa;
    font-size: 10px;
    line-height: 1.6;
}

.graph-edge {
    stroke: #c6cde0;
    stroke-width: 1.7;
}

.graph-node {
    stroke: #ffffff;
    stroke-width: 2;
}

.graph-label {
    fill: #344057;
    font-family: "DM Sans", sans-serif;
    font-size: 11px;
    font-weight: 600;
}

.timeline-container {
    padding-top: 5px;
}

.timeline-item {
    position: relative;
    margin-left: 6px;
    padding: 0 0 23px 23px;
    border-left: 2px solid #e4e8f2;
}

.timeline-item:last-child {
    padding-bottom: 0;
    border-left-color: transparent;
}

.timeline-item::before {
    position: absolute;
    top: 2px;
    left: -6px;
    width: 10px;
    height: 10px;
    border: 2px solid white;
    border-radius: 50%;
    background: var(--blue);
    box-shadow: 0 0 0 2px #dfe4ff;
    content: "";
}

.timeline-date {
    margin-bottom: 6px;
    color: var(--blue);
    font-size: 10px;
    font-weight: 700;
}

.timeline-item h3 {
    margin: 0 0 6px;
    font-size: 13px;
}

.timeline-item p {
    margin: 0;
    color: #79849a;
    font-size: 11px;
    line-height: 1.6;
}

.empty-state {
    padding: 25px;
    color: #929bad;
    text-align: center;
    font-size: 12px;
    white-space: normal;
}

footer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
    padding: 20px 0 5px;
    border-top: 1px solid #e2e6ef;
    color: #8993a5;
    font-size: 10px;
}

@media (max-width: 1250px) {
    .main-content {
        padding: 28px 23px;
    }

    .sidebar {
        width: 215px;
    }

    .main-content {
        margin-left: 215px;
    }

    .stats-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .content-grid, .visual-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 700px) {
    .sidebar {
        position: static;
        width: 100%;
        padding: 18px;
    }

    .brand {
        padding-bottom: 20px;
    }

    .nav-label, .sidebar-bottom {
        display: none;
    }

    .sidebar {
        display: block;
    }

    .nav-link {
        display: inline-block;
        margin: 3px;
        padding: 9px;
        font-size: 11px;
    }

    .main-content {
        margin-left: 0;
        padding: 22px 14px;
    }

    .topbar {
        flex-direction: column;
    }

    .topbar-right {
        justify-content: space-between;
        width: 100%;
    }

    .stats-grid {
        gap: 10px;
    }

    .stat-card {
        padding: 15px;
    }

    .stat-card h2 {
        font-size: 25px;
    }

    .panel {
        padding: 17px;
    }

    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }

    .table-controls {
        flex-direction: column;
    }

    .table-controls input, .table-controls select {
        width: 100%;
        max-width: none;
    }

    .graph-container, .graph-container svg {
        min-height: 270px;
        height: 270px;
    }
}
