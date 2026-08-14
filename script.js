let selectedFormat = 1;
let uploadedPhotoBase64 = "";

let expCount = 0;
let eduCount = 0;

// Page Initialize
window.onload = function() {
    addExperienceGroup(); // 1st Experience default
    addEducationGroup();  // 1st Education default
    generateCV();
};

// Add Dynamic Work Experience Input Block
function addExperienceGroup() {
    expCount++;
    const container = document.getElementById('experienceContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-card';
    div.id = `expGroup_${expCount}`;
    div.innerHTML = `
        <button type="button" class="btn-remove" onclick="removeGroup('expGroup_${expCount}')">Remove</button>
        <div class="form-group">
            <label>প্রতিষ্ঠান ও পদবি:</label>
            <input type="text" class="exp-title" placeholder="যেমন: Senior Developer - Tech Corp" oninput="generateCV()">
        </div>
        <div class="form-group">
            <label>সময়কাল:</label>
            <input type="text" class="exp-period" placeholder="যেমন: Jan 2022 - Present" oninput="generateCV()">
        </div>
        <div class="form-group">
            <label>দায়িত্ব/বিবরণ:</label>
            <textarea class="exp-details" rows="2" placeholder="কাজের বিবরণ..." oninput="generateCV()"></textarea>
        </div>
    `;
    container.appendChild(div);
    generateCV();
}

// Add Dynamic Education Input Block
function addEducationGroup() {
    eduCount++;
    const container = document.getElementById('educationContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-card';
    div.id = `eduGroup_${eduCount}`;
    div.innerHTML = `
        <button type="button" class="btn-remove" onclick="removeGroup('eduGroup_${eduCount}')">Remove</button>
        <div class="form-group">
            <label>ডিগ্রি ও বিষয়:</label>
            <input type="text" class="edu-degree" placeholder="যেমন: B.Sc in Computer Science" oninput="generateCV()">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>প্রতিষ্ঠান:</label>
                <input type="text" class="edu-inst" placeholder="যেমন: ঢাকা বিশ্ববিদ্যালয়" oninput="generateCV()">
            </div>
            <div class="form-group">
                <label>পাসের সাল & রেজাল্ট:</label>
                <input type="text" class="edu-year" placeholder="যেমন: 2022 (CGPA: 3.80)" oninput="generateCV()">
            </div>
        </div>
    `;
    container.appendChild(div);
    generateCV();
}

function removeGroup(id) {
    const el = document.getElementById(id);
    if (el) {
        el.remove();
        generateCV();
    }
}

function selectTemplate(formatNum) {
    selectedFormat = formatNum;
    document.querySelectorAll('.template-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === formatNum - 1);
    });
    generateCV();
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        uploadedPhotoBase64 = reader.result;
        generateCV();
    }
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

// Generate CV Dynamically
function generateCV() {
    const name = document.getElementById('inputName').value.trim();
    const title = document.getElementById('inputTitle').value.trim();
    const phone = document.getElementById('inputPhone').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const address = document.getElementById('inputAddress').value.trim();
    const objective = document.getElementById('inputObjective').value.trim();

    // Get Dynamic Experiences
    const expList = [];
    document.querySelectorAll('#experienceContainer .dynamic-card').forEach(card => {
        const expTitle = card.querySelector('.exp-title').value.trim();
        const expPeriod = card.querySelector('.exp-period').value.trim();
        const expDetails = card.querySelector('.exp-details').value.trim();
        if (expTitle || expPeriod || expDetails) {
            expList.push({ title: expTitle, period: expPeriod, details: expDetails });
        }
    });

    // Get Dynamic Educations
    const eduList = [];
    document.querySelectorAll('#educationContainer .dynamic-card').forEach(card => {
        const eduDegree = card.querySelector('.edu-degree').value.trim();
        const eduInst = card.querySelector('.edu-inst').value.trim();
        const eduYear = card.querySelector('.edu-year').value.trim();
        if (eduDegree || eduInst || eduYear) {
            eduList.push({ degree: eduDegree, inst: eduInst, year: eduYear });
        }
    });

    const skillsInput = document.getElementById('inputSkills').value.trim();
    const skills = skillsInput ? skillsInput.split(',').map(s => s.trim()).filter(s => s) : [];
    const languages = document.getElementById('inputLanguages').value.trim();
    const hobbies = document.getElementById('inputHobbies').value.trim();

    const paper = document.getElementById('cvPaper');
    paper.className = `cv-paper format-${selectedFormat}`;

    const photoTagF1 = uploadedPhotoBase64 ? `<img src="${uploadedPhotoBase64}" class="f1-photo" alt="Photo">` : '';
    const photoTagF2 = uploadedPhotoBase64 ? `<img src="${uploadedPhotoBase64}" class="f2-photo" alt="Photo">` : '';
    const photoTagF3 = uploadedPhotoBase64 ? `<img src="${uploadedPhotoBase64}" class="f3-photo" alt="Photo">` : '';

    // ================= FORMAT 1 =================
    if (selectedFormat === 1) {
        let expHTML = expList.map(item => `
            <div class="f1-item">
                <div class="f1-item-header"><span>${item.title}</span> <span>${item.period}</span></div>
                <div style="white-space: pre-line; color:#475569; margin-top:2px;">${item.details}</div>
            </div>
        `).join('');

        let eduHTML = eduList.map(item => `
            <div class="f1-item">
                <div class="f1-item-header"><span>${item.degree}</span> <span>${item.year}</span></div>
                <div class="f1-item-sub">${item.inst}</div>
            </div>
        `).join('');

        let skillTags = skills.map(s => `<span class="f1-tag">${s}</span>`).join('');

        paper.innerHTML = `
            <div class="f1-header">
                ${photoTagF1}
                <div>
                    ${name ? `<div class="f1-name">${name}</div>` : ''}
                    ${title ? `<div class="f1-title">${title}</div>` : ''}
                    <div class="f1-contact-grid">
                        ${phone ? `<div><b>Phone:</b> ${phone}</div>` : ''}
                        ${email ? `<div><b>Email:</b> ${email}</div>` : ''}
                        ${address ? `<div style="grid-column: span 2;"><b>Address:</b> ${address}</div>` : ''}
                    </div>
                </div>
            </div>

            ${objective ? `<div class="f1-section-title">Profile Summary</div><p style="font-size:9pt; color:#475569;">${objective}</p>` : ''}
            ${expList.length > 0 ? `<div class="f1-section-title">Work Experience</div>${expHTML}` : ''}
            ${eduList.length > 0 ? `<div class="f1-section-title">Education</div>${eduHTML}` : ''}
            ${skills.length > 0 ? `<div class="f1-section-title">Skills & Expertise</div><div class="f1-skill-tags">${skillTags}</div>` : ''}
            ${languages ? `<div class="f1-section-title">Languages</div><p style="font-size:9pt; color:#475569;">${languages}</p>` : ''}
        `;
    } 
    // ================= FORMAT 2 =================
    else if (selectedFormat === 2) {
        let expHTML = expList.map(item => `
            <div style="margin-bottom:12px; font-size:9pt;">
                <b>${item.title}</b>
                <div style="color:#64748b; font-size:8.5pt;">${item.period}</div>
                <div style="white-space: pre-line; color:#475569; margin-top:3px;">${item.details}</div>
            </div>
        `).join('');

        let eduHTML = eduList.map(item => `
            <div style="margin-bottom:10px; font-size:9pt;">
                <b>${item.degree}</b>
                <div style="color:#64748b; font-size:8.5pt;">${item.inst} ${item.year ? `| ${item.year}` : ''}</div>
            </div>
        `).join('');

        let skillsList = skills.map(s => `<div style="margin-bottom: 3px;">• ${s}</div>`).join('');

        paper.innerHTML = `
            <div class="f2-sidebar">
                ${photoTagF2}
                ${name ? `<div class="f2-sidebar-name">${name}</div>` : ''}
                ${title ? `<div class="f2-sidebar-title">${title}</div>` : ''}

                ${(phone || email || address) ? `
                    <div class="f2-sidebar-heading">CONTACT</div>
                    <div class="f2-sidebar-text">
                        ${phone ? `📞 ${phone}<br>` : ''}
                        ${email ? `✉️ ${email}<br>` : ''}
                        ${address ? `📍 ${address}` : ''}
                    </div>
                ` : ''}

                ${skills.length > 0 ? `<div class="f2-sidebar-heading">SKILLS</div><div class="f2-sidebar-text">${skillsList}</div>` : ''}
                ${languages ? `<div class="f2-sidebar-heading">LANGUAGES</div><div class="f2-sidebar-text">${languages}</div>` : ''}
                ${hobbies ? `<div class="f2-sidebar-heading">HOBBIES</div><div class="f2-sidebar-text">${hobbies}</div>` : ''}
            </div>
            <div class="f2-main">
                ${objective ? `<div class="f2-main-heading">PROFILE</div><p style="font-size:9pt; color:#475569;">${objective}</p>` : ''}
                ${expList.length > 0 ? `<div class="f2-main-heading">WORK EXPERIENCE</div>${expHTML}` : ''}
                ${eduList.length > 0 ? `<div class="f2-main-heading">EDUCATION</div>${eduHTML}` : ''}
            </div>
        `;
    } 
    // ================= FORMAT 3 =================
    else if (selectedFormat === 3) {
        let expHTML = expList.map(item => `
            <div style="margin-bottom:10px; font-size:9.5pt;">
                <b>${item.title}</b> (${item.period})
                <div style="white-space: pre-line; margin-left:10px;">${item.details}</div>
            </div>
        `).join('');

        let eduRows = eduList.map(item => `
            <tr>
                <td>${item.degree}</td>
                <td>${item.inst}</td>
                <td>${item.year}</td>
            </tr>
        `).join('');

        paper.innerHTML = `
            <div class="f3-header">
                <div>
                    ${name ? `<div class="f3-name">${name}</div>` : ''}
                    ${address ? `<div style="font-size:9.5pt;">Address: ${address}</div>` : ''}
                    ${phone ? `<div style="font-size:9.5pt;">Cell: ${phone}</div>` : ''}
                    ${email ? `<div style="font-size:9.5pt;">E-mail: ${email}</div>` : ''}
                </div>
                ${photoTagF3}
            </div>

            ${objective ? `<div class="f3-box-title">CAREER OBJECTIVE:</div><div style="font-size:9.5pt;">${objective}</div>` : ''}
            ${expList.length > 0 ? `<div class="f3-box-title">WORKING EXPERIENCE:</div>${expHTML}` : ''}
            
            ${eduList.length > 0 ? `
                <div class="f3-box-title">EDUCATIONAL QUALIFICATION:</div>
                <table class="f3-table">
                    <tr><th>Degree</th><th>Institute</th><th>Year & Result</th></tr>
                    ${eduRows}
                </table>
            ` : ''}

            ${skills.length > 0 ? `<div class="f3-box-title">SKILLS & EXPERTISE:</div><div style="font-size:9.5pt;">• ${skills.join('<br>• ')}</div>` : ''}
            ${languages ? `<div class="f3-box-title">LANGUAGE PROFICIENCY:</div><div style="font-size:9.5pt;">${languages}</div>` : ''}
        `;
    }
}