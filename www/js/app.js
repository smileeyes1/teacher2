document.getElementById('btnCompile').addEventListener('click', function() {
    const subject = document.getElementById('inputSubject').value.trim();
    const grade = parseInt(document.getElementById('inputGrade').value);
    const topic = document.getElementById('inputTopic').value.trim();
    
    if(!subject || !topic) {
        alert("يرجى ملء جميع حقول الإدخال لتشغيل المحرك الذكي.");
        return;
    }
    executeDecisionLogicEngine(subject, grade, topic);
});

function executeDecisionLogicEngine(subject, grade, topic) {
    const container = document.getElementById('outputPrintContainer');
    container.innerHTML = "";

    let pedagogicalTier = "";
    let cognitiveTarget = "";
    
    if (grade >= 1 && grade <= 3) {
        pedagogicalTier = "المرحلة الأساسية الدنيا (حسي وملموس)";
        cognitiveTarget = "التدرج الانتقالي: من المحسوس (الرسم البصري) إلى شبه المحسوس (المسائل اللفظية المبسطة) وصولاً إلى المجرد (الرموز).";
    } else if (grade >= 4 && grade <= 6) {
        pedagogicalTier = "المرحلة الأساسية المتوسطة (مفاهيمي وتطبيقي)";
        cognitiveTarget = "التركيز على النمذجة المفاهيمية والمقارنة والربط المباشر بالسياقات الحياتية والبيئية المحيطة بالمتعلم.";
    } else {
        pedagogicalTier = "المرحلة الأساسية العليا (تحليلي واستنتاجي)";
        cognitiveTarget = "استهداف مهارات التفكير العليا والتفكيك المنطقي والاستنتاج القائم على حل المشكلات المعقدة.";
    }

    const smartObjectives = generateAdaptiveObjectives(subject, grade, topic);
    const lessonIntroduction = generateAdaptiveIntroduction(subject, grade, topic);
    const learningPath = generateScaffoldedPath(subject, grade, topic);
    const interactiveActivities = generateAdaptiveActivities(subject, grade, topic);
    const structuredEvaluation = generateMultiLevelEvaluation(subject, grade, topic);
    const homework = generateAlignedHomework(subject, grade, topic);

    let htmlBlueprint = `
        <div class="academic-header">
            <div class="header-flex-row">
                <div><strong>المادة:</strong> \${enforceEasternArabicNumerals(subject)}</div>
                <div><strong>الصف الدراسي:</strong> \${enforceEasternArabicNumerals(getGradeText(grade))}</div>
            </div>
            <div class="header-flex-row">
                <div><strong>عنوان الدرس:</strong> \${enforceEasternArabicNumerals(topic)}</div>
                <div><strong>المستوى المعرفي الحاكم:</strong> \${pedagogicalTier}</div>
            </div>
        </div>

        <div class="academic-section">
            <h2>[١] أهداف الدرس السلوكية (SMART Objectives)</h2>
            <ul class="objective-list">
                \${smartObjectives.map(obj => `<li>• \${enforceEasternArabicNumerals(obj)}</li>`).join('')}
            </ul>
        </div>

        <div class="academic-section">
            <h2>[٢] التمهيد والتهيئة الحافزة (Introduction)</h2>
            <p>\${enforceEasternArabicNumerals(lessonIntroduction)}</p>
        </div>

        <div class="academic-section">
            <h2>[٣] الشرح المتدرج ومسار التعلّم (Scaffolded Learning Path)</h2>
            <div class="activity-box">
                <p><strong>المصفوفة الإرشادية للمدرس:</strong> \${cognitiveTarget}</p>
                <div style="margin-top: 10px;">\${enforceEasternArabicNumerals(learningPath)}</div>
            </div>
        </div>

        <div class="academic-section">
            <h2>[٤] الأنشطة التعليمية المتكاملة (Integrated Activities)</h2>
            \${interactiveActivities.map(act => `
                <div class="activity-card">
                    <strong>نمط النشاط:</strong> \${act.type}<br>
                    <strong>الإجراء التنفيذي:</strong> \${enforceEasternArabicNumerals(act.body)}
                </div>
            `).join('')}
        </div>

        <div class="academic-section">
            <h2>[٥] التقويم متعدد المستويات (Multi-Level Evaluation)</h2>
            <div class="evaluation-item"><strong>المستوى الأول (مباشر/بسيط):</strong><br> \${enforceEasternArabicNumerals(structuredEvaluation.easy)}</div>
            <div class="evaluation-item" style="margin-top:10px;"><strong>المستوى الثاني (متوسط/تطبيقي):</strong><br> \${enforceEasternArabicNumerals(structuredEvaluation.medium)}</div>
            <div class="evaluation-item" style="margin-top:10px;"><strong>المستوى الثالث (تفكير ناقد/عميق):</strong><br> \${enforceEasternArabicNumerals(structuredEvaluation.hard)}</div>
        </div>

        <div class="academic-section">
            <h2>[٦] الواجب المنزلي المرتبط بالأهداف (Aligned Homework)</h2>
            <p>\${enforceEasternArabicNumerals(homework)}</p>
        </div>
    `;

    container.innerHTML = htmlBlueprint;
}

function generateAdaptiveObjectives(subject, grade, topic) {
    if (grade <= 3) {
        return [
            `أن يستنتج التلميذ مفهوم (\${topic}) باستخدام الوسائل والأشكال الحسية المتوفرة بدقة وبشكل صحيح.`,
            `أن يمثل التلميذ القيمة الرياضية أو المفهوم العلمي لـ (\${topic}) بالرسم المبسط دون أخطاء.`
        ];
    } else if (grade <= 6) {
        return [
            `أن يشرح المتعلم القاعدة الأساسية المتحكمة في (\${topic}) بلغة علمية سليمة بعد تفحص الأمثلة الحياتية.`,
            `أن يطبق المتعلم خطوات حل المسائل المرتبطة بـ (\${topic}) في سياقات جديدة ومألوفة بنسبة نجاح لا تقل عن ٩٠%.`
        ];
    } else {
        return [
            `أن يحلل المتعلم العلاقة المتبادلة بين مفاهيم (\${topic}) والمعطيات الرياضية أو الفيزيائية المجاورة لها بدقة وفهم عميق.`,
            `أن يبتكر المتعلم نموذجاً أو حلاً برهنياً لمشكلة تشتمل على مسائل مركبة لـ (\${topic}) بأسلوب علمي رصين.`
        ];
    }
}

function generateAdaptiveIntroduction(subject, grade, topic) {
    if (grade <= 3) {
        return `ندخل إلى الغرفة الصفية وفي جعبتنا سلة من الألعاب أو حبات الفاكهة المحسوسة. نسأل الطلاب: إذا كان معنا مجموعة من العناصر وقمنا بإخفاء جزء منها، كم يتبقى لدينا؟ نربط هذا المشهد الواقعي مباشرة بعنوان درسنا اليوم: \${topic}.`;
    } else if (grade <= 6) {
        return `بدء الدرس من خلال عرض ظاهرة حياتية مألوفة للطلاب (كحساب تكاليف رحلة أو توزيع مهام). نطرح تساؤلاً محورياً يدفع الطلاب للبحث عن الأداة الرياضية أو المفهوم العلمي المناسب لترجمة هذه الظاهرة، وهو ما يقودنا إلى: \${topic}.`;
    } else {
        return `نبدأ بمسألة مفتوحة ذات نهايات متعددة أو مفارقة علمية/رياضية تتحدى البنية المعرفية الحالية للطلاب. نطلب منهم تفكيك عناصر المشكلة وصياغة فرضيات أولية، لنكتشف معاً أن مفتاح الحل الجذري يكمن في سبر أغوار \${topic}.`;
    }
}

function generateScaffoldedPath(subject, grade, topic) {
    if (grade <= 3) {
        return `<b>الخطوة ١ (المحسوس):</b> عرض ٥ مكعبات حقيقية أمام النظر، ثم سحب مكعبين وشطبها بصرياً ليلاحظ الطفل التغير المادي.<br><b>الخطوة ٢ (شبه المحسوس):</b> رسم ٥ دوائر على السبورة وطلب من الطلاب شطب دائرتين باستخدام القلم.<br><b>الخطوة ٣ (المجرد):</b> كتابة المسألة الرياضية باستخدام الرموز الصرفة لتثبيت الاستنتاج المعرفي.`;
    } else if (grade <= 6) {
        return `<b>المرحلة الأولى:</b> مراجعة المتطلبات الأساسية السابقة وربطها بالمفهوم الجديد.<br><b>المرحلة الثانية:</b> صياغة التعريف الرياضي/العلمي لـ (\${topic}) وبناء جدول مقارنة يعزل الخصائص الثابتة عن المتغيرة.<br><b>المرحلة الثالثة:</b> حل مثال نموذجي مشترك على السبورة مع تدوين خطوات خوارزمية الحل بوضوح وبترتيب متتابع.`;
    } else {
        return `<b>التفكيك الهيكلي:</b> وضع الإطار النظري الكلي للمفهوم، ثم تكليف الطلاب باستنباط العلاقات الداخلية.<br><b>النمذجة الرياضية العميقة:</b> تحويل الأفكار التحليلية الصعبة إلى معادلات وصيغ برهانية صلبة والتحقق من صحة الفرضيات عبر مناقشة جماعية يقودها الطلاب أنفسهم.`;
    }
}

function generateAdaptiveActivities(subject, grade, topic) {
    return [
        { type: "نشاط فردي ذاتي", body: `يقوم كل طالب داخل مقعده بمحاولة حل المسألة التعليمية التطبيقية الأولى لـ (\${topic}) في صمت، لتقييم مستوى الاستيعاب الفردي الأولي.` },
        { type: "نشاط جماعي تعاوني", body: `التعاون في مجموعات رباعية متجانسة لحل بطاقة تشتمل على لغز أو مسألة حياتية تتطلب دمج مهارات التفكير لتطبيق المفهوم المستهدف لـ (\${topic}).` }
    ];
}

function generateMultiLevelEvaluation(subject, grade, topic) {
    if (grade <= 3) {
        return {
            easy: `باستخدام الرسم المجاور، اشطب ٣ عناصر واكتب عدد العناصر المتبقية في الصندوق الفراغي المخصص.`,
            medium: `مسألة لفظية قصيرة: مع أحمد ٧ أقلام تلوين، أعطى شقيقته ٤ أقلام. كم قلمين بقي مع أحمد الآن؟`,
            hard: `إذا علمت أن الصندوق المفتوح يحتوي على عدد من الكرات، وأضفنا إليها ٢ فأصبح المجموع ٦، فكم كرة كانت داخل الصندوق منذ البداية؟`
        };
    } else if (grade <= 6) {
        return {
            easy: `أوجد الناتج المباشر والنهائي للمسألة الحسابية أو العلمية الموضحة في النموذج رقم ١ لدرس (\${topic}).`,
            medium: `قارن بين الحالة 'أ' والحالة 'ب' في التطبيق المرفق، مستخرجاً الفروقات الجوهرية بناءً على ما تعلمته اليوم في (\${topic}).`,
            hard: `اكتشف الخطأ الرياضي/العلمي في الحل المقترح من قبل أحد الطلاب في الورقة الخارجية، وقم بتصحيحه معللاً ذلك بالقاعدة العلمية.`
        };
    } else {
        return {
            easy: `عرف بدقة وبصياغة علمية رصينة المفهوم الجوهري الحاكم لـ (\${topic}) مع ذكر محدداته الأساسية.`,
            medium: `علل منطقياً وبناءً على البراهين الرياضية سبب تحول المخرجات عند قيامنا بتغيير المعاملات الأساسية في مسألة (\${topic}).`,
            hard: `برهن صحة الفرضية القائلة بأن كافة مخرجات النظام تتناسب عكسياً مع المتغيرات المستقلة في المسائل المركبة لـ (\${topic}).`
        };
    }
}

function generateAlignedHomework(subject, grade, topic) {
    return `حل المسائل رقم ١، ورقم ٢، ورقم ٣ في صفحة التدريبات العامة داخل الكتاب المدرسي المقر، مع التركيز على تدوين ورسم خطوات التفكير والحل بالكامل في الدفتر الخاص بالواجبات البيتيّة.`;
}

function getGradeText(grade) {
    const gradesMap = {
        1: "الصف الأول الأساسي",
        2: "الصف الثاني الأساسي",
        3: "الصف الثالث الأساسي",
        5: "الصف الخامس الأساسي",
        8: "الصف الثامن الأساسي"
    };
    return gradesMap[grade] || `الصف \${grade} الدراسي`;
}

function enforceEasternArabicNumerals(str) {
    if(typeof str !== 'string') str = String(str);
    const easternDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[0-9]/g, function(w) {
        return easternDigits[+w];
    });
}