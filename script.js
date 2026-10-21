
const form = document.querySelector("#evidence-form");
const message = document.querySelector("#form-message");
const tableBody = document.querySelector("#evidence-table-body");

let evidenceRecords = [];

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

function riskLevel(score) {
    if (score >= 60) return "high";
    if (score >= 30) return "medium";
    return "low";
}

function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleString();
}

async function loadEvidence() {
    try {
        const response = await fetch("/api/evidence");
        if (!response.ok) throw new Error("Could not load evidence");

        const data = await response.json();
        evidenceRecords = data.evidence || [];

        updateDashboard();
        renderTable();
        renderGraph();
        renderTimeline();
    } catch (error) {
        tableBody.innerHTML =
            '<tr><td colspan="5">Could not load records. Check that Flask is running.</td></tr>';
    }
}

function updateDashboard() {
    const records = evidenceRecords;
    const cases = new Set(records.map(item => item.case_id));
    const duplicates = records.filter(item => item.is_duplicate);
    const high = records.filter(item => item.risk_score >= 60);
    const medium = records.filter(
        item => item.risk_score >= 30 && item.risk_score < 60
    );

    document.querySelector("#total-count").textContent = records.length;
    document.querySelector("#case-count").textContent = cases.size;
    document.querySelector("#duplicate-count").textContent = duplicates.length;
    document.querySelector("#risk-count").textContent = high.length;
    document.querySelector("#high-signal").textContent = high.length;
    document.querySelector("#medium-signal").textContent = medium.length;
    document.querySelector("#record-label").textContent =
        `${records.length} records`;

    const identifiers = new Set(
        records.map(item =>
            `${item.evidence_type.toLowerCase()}|${item.value.trim().toLowerCase()}`
        )
    );

    const linkCount = records.length - identifiers.size;
    document.querySelector("#link-count").textContent = linkCount;

    document.querySelector("#analysis-title").textContent =
        records.length ? "Analysis updated" : "Awaiting evidence";

    document.querySelector("#analysis-summary").textContent =
        records.length
            ? `${high.length} high-risk records and ${duplicates.length} possible duplicates need review.`
            : "Add evidence to begin analysing records.";
}

function renderTable() {
    const search = document.querySelector("#search-input").value.toLowerCase();
    const filter = document.querySelector("#risk-filter").value;

    const filtered = evidenceRecords.filter(item => {
        const text = [
            item.case_id,
            item.evidence_type,
            item.value,
            item.source,
            item.notes
        ].join(" ").toLowerCase();

        const matchesSearch = text.includes(search);
        const level = riskLevel(item.risk_score);

        const matchesFilter =
            filter === "all" ||
            (filter === "duplicate" && item.is_duplicate) ||
            filter === level;

        return matchesSearch && matchesFilter;
    });

    if (!filtered.length) {
        tableBody.innerHTML =
            '<tr><td colspan="5">No matching evidence records.</td></tr>';
        return;
    }

    tableBody.innerHTML = filtered.map(item => {
        const level = riskLevel(item.risk_score);
        let status = "Normal review";
        let statusClass = "status-normal";

        if (item.is_duplicate) {
            status = "Possible duplicate";
            statusClass = "status-duplicate";
        } else if (level === "high" || level === "medium") {
            status = "Review required";
            statusClass = "status-review";
        }

        return `
            <tr>
                <td class="case-cell">
                    <strong>${escapeHTML(item.case_id)}</strong>
                    <small>#${escapeHTML(item.id)}</small>
                </td>
                <td>
                    <span class="evidence-type">${escapeHTML(item.evidence_type)}</span>
                    <span class="value-cell">${escapeHTML(item.value)}</span>
                </td>
                <td>${escapeHTML(item.source)}</td>
                <td>
                    <span class="risk-pill risk-${level}">
                        ${Number(item.risk_score) || 0}/100
                    </span>
                </td>
                <td>
                    <span class="status-pill ${statusClass}">
                        ${status}
                    </span>
                </td>
            </tr>
        `;
    }).join("");
}

function renderGraph() {
    const container = document.querySelector("#graph-container");

    if (!evidenceRecords.length) {
        container.innerHTML =
            '<p class="empty-state">The graph will appear when evidence is available.</p>';
        return;
    }

    const width = 600;
    const height = Math.max(300, evidenceRecords.length * 75);
    const nodes = [];
    const edges = [];
    const casePositions = {};
    const identifierPositions = {};

    evidenceRecords.forEach((item, index) => {
        const caseKey = item.case_id;
        const identifierKey =
            `${item.evidence_type.toLowerCase()}|${item.value.trim().toLowerCase()}`;

        if (!casePositions[caseKey]) {
            casePositions[caseKey] = {
                x: 100,
                y: 55 + Object.keys(casePositions).length * 75,
                label: caseKey,
                color: "#6679ef"
            };
            nodes.push(casePositions[caseKey]);
        }

        if (!identifierPositions[identifierKey]) {
            identifierPositions[identifierKey] = {
                x: 420,
                y: 55 + Object.keys(identifierPositions).length * 75,
                label: item.value,
                color: "#31a888"
            };
            nodes.push(identifierPositions[identifierKey]);
        }

        edges.push({
            from: casePositions[caseKey],
            to: identifierPositions[identifierKey]
        });
    });

    const svgEdges = edges.map(edge =>
        `<line class="graph-edge"
            x1="${edge.from.x}" y1="${edge.from.y}"
            x2="${edge.to.x}" y2="${edge.to.y}" />`
    ).join("");

    const svgNodes = nodes.map(node => `
        <circle class="graph-node" cx="${node.x}" cy="${node.y}"
                r="9" fill="${node.color}"></circle>
        <text class="graph-label" x="${node.x + 14}" y="${node.y + 4}">
            ${escapeHTML(node.label.slice(0, 22))}
        </text>
    `).join("");

    container.innerHTML = `
        <svg viewBox="0 0 ${width} ${height}"
             role="img" aria-label="Evidence relationship graph">
            ${svgEdges}
            ${svgNodes}
        </svg>
    `;
}

function renderTimeline() {
    const container = document.querySelector("#timeline-container");

    if (!evidenceRecords.length) {
        container.innerHTML =
            '<p class="empty-state">No timeline records yet.</p>';
        return;
    }

    const sorted = [...evidenceRecords].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    container.innerHTML = sorted.map(item => `
        <div class="timeline-item">
            <div class="timeline-date">${escapeHTML(formatDate(item.timestamp))}</div>
            <h3>${escapeHTML(item.evidence_type)} · ${escapeHTML(item.case_id)}</h3>
            <p>${escapeHTML(item.value)}</p>
            <p>${escapeHTML(item.source)}</p>
        </div>
    `).join("");
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    message.classList.remove("error");
    message.textContent = "Saving evidence...";

    const data = {
        case_id: document.querySelector("#case-id").value.trim(),
        evidence_type: document.querySelector("#evidence-type").value,
        value: document.querySelector("#evidence-value").value.trim(),
        source: document.querySelector("#evidence-source").value.trim(),
        timestamp: document.querySelector("#evidence-date").value,
        notes: document.querySelector("#evidence-notes").value.trim()
    };

    try {
        const response = await fetch("/api/evidence", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Could not save evidence.");
        }

        message.textContent = result.message;
        form.reset();
        await loadEvidence();
    } catch (error) {
        message.classList.add("error");
        message.textContent = error.message;
    } finally {
        submitButton.disabled = false;
    }
});

document.querySelector("#search-input").addEventListener("input", renderTable);
document.querySelector("#risk-filter").addEventListener("change", renderTable);

document.querySelector("#export-btn").addEventListener("click", function () {
    const columns = [
        "id", "case_id", "evidence_type", "value",
        "source", "timestamp", "notes", "is_duplicate", "risk_score"
    ];

    const quoteCSV = value =>
        `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = [
        columns.join(","),
        ...evidenceRecords.map(item =>
            columns.map(column => quoteCSV(item[column])).join(",")
        )
    ];

    const blob = new Blob(["\uFEFF" + rows.join("\r\n")], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fraudtrace-evidence.csv";
    link.click();
    URL.revokeObjectURL(url);
});

loadEvidence();


