import { useEffect, useMemo, useState } from "react";

const initialStats = {
  forca: 1,
  nutricao: 1,
  disciplina: 1,
  resistencia: 1,
  disposicao: 1,
  vitalidade: 1,
};

const initialBuffs = {
  mounjaro: true,
  creatina: true,
  bcaa: false,
  preTreino: false,
};

const alimentosBase = [
  { nome: "Frango grelhado", cal: 165, prot: 31, carb: 0, gord: 3.6 },
  { nome: "Carne bovina magra", cal: 250, prot: 26, carb: 0, gord: 15 },
  { nome: "Patinho moído", cal: 219, prot: 27, carb: 0, gord: 12 },
  { nome: "Ovo inteiro", cal: 155, prot: 13, carb: 1.1, gord: 11 },
  { nome: "Clara de ovo", cal: 52, prot: 11, carb: 0.7, gord: 0.2 },
  { nome: "Salmão", cal: 208, prot: 20, carb: 0, gord: 13 },
  { nome: "Tilápia", cal: 129, prot: 26, carb: 0, gord: 2.7 },
  { nome: "Sardinha", cal: 208, prot: 25, carb: 0, gord: 11 },
  { nome: "Atum", cal: 132, prot: 29, carb: 0, gord: 1 },
  { nome: "Whey protein", cal: 400, prot: 80, carb: 10, gord: 6 },
  { nome: "Leite semidesnatado", cal: 50, prot: 3.3, carb: 5, gord: 1.6 },
  { nome: "Iogurte natural", cal: 61, prot: 3.5, carb: 4.7, gord: 3.3 },
  { nome: "Queijo cottage", cal: 98, prot: 11, carb: 3.4, gord: 4.3 },
  { nome: "Arroz branco cozido", cal: 130, prot: 2.7, carb: 28, gord: 0.3 },
  { nome: "Arroz integral cozido", cal: 111, prot: 2.6, carb: 23, gord: 0.9 },
  { nome: "Feijão cozido", cal: 127, prot: 8.7, carb: 23, gord: 0.5 },
  { nome: "Lentilha cozida", cal: 116, prot: 9, carb: 20, gord: 0.4 },
  { nome: "Grão-de-bico cozido", cal: 164, prot: 8.9, carb: 27, gord: 2.6 },
  { nome: "Batata doce", cal: 86, prot: 1.6, carb: 20, gord: 0.1 },
  { nome: "Batata inglesa", cal: 77, prot: 2, carb: 17, gord: 0.1 },
  { nome: "Mandioca cozida", cal: 125, prot: 1, carb: 30, gord: 0.3 },
  { nome: "Aveia", cal: 389, prot: 17, carb: 66, gord: 7 },
  { nome: "Pão francês", cal: 270, prot: 8, carb: 56, gord: 3 },
  { nome: "Macarrão cozido", cal: 158, prot: 5.8, carb: 31, gord: 0.9 },
  { nome: "Banana", cal: 89, prot: 1.1, carb: 23, gord: 0.3 },
  { nome: "Maçã", cal: 52, prot: 0.3, carb: 14, gord: 0.2 },
  { nome: "Mamão", cal: 43, prot: 0.5, carb: 11, gord: 0.3 },
  { nome: "Caqui", cal: 70, prot: 0.6, carb: 19, gord: 0.2 },
  { nome: "Abacate", cal: 160, prot: 2, carb: 9, gord: 15 },
  { nome: "Brócolis", cal: 34, prot: 2.8, carb: 7, gord: 0.4 },
  { nome: "Repolho", cal: 25, prot: 1.3, carb: 6, gord: 0.1 },
  { nome: "Cenoura", cal: 41, prot: 0.9, carb: 10, gord: 0.2 },
  { nome: "Shimeji", cal: 35, prot: 2.7, carb: 6, gord: 0.4 },
  { nome: "Shitake", cal: 34, prot: 2.2, carb: 7, gord: 0.5 },
  { nome: "Azeite", cal: 884, prot: 0, carb: 0, gord: 100 },
  { nome: "Chia", cal: 486, prot: 17, carb: 42, gord: 31 },
  { nome: "Gergelim", cal: 573, prot: 18, carb: 23, gord: 50 },
  { nome: "Amendoim", cal: 567, prot: 26, carb: 16, gord: 49 },
  { nome: "Castanha de caju", cal: 553, prot: 18, carb: 30, gord: 44 },
];

const esportesBase = [
  ["Caminhada", 120], ["Corrida", 300], ["Musculação", 250],
  ["Futebol", 350], ["Skate", 280], ["Ciclismo", 320],
  ["Natação", 400], ["Boxe", 450], ["Jiu-jitsu", 420],
  ["Muay Thai", 430], ["Basquete", 360], ["Vôlei", 260],
  ["Tênis", 330], ["Dança", 300], ["Crossfit", 500],
  ["HIIT", 480], ["Yoga", 160], ["Pilates", 180],
  ["Remo", 380], ["Escalada", 410], ["Trilha", 340],
  ["Elíptico", 290], ["Esteira", 310], ["Funcional", 350],
  ["Handebol", 360], ["Surf", 300], ["Patins", 280],
  ["Luta livre", 420], ["Rugby", 500], ["Pular corda", 450],
];

function App() {
  const [carregado, setCarregado] = useState(false);

  const [nome, setNome] = useState("Guerreiro Ki");
  const [classe, setClasse] = useState("Aprendiz do Corpo");
  const [avatar, setAvatar] = useState("⚔️");

  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [stats, setStats] = useState(initialStats);

  const [peso, setPeso] = useState(113);
  const [pesoAnterior, setPesoAnterior] = useState(113);
  const [altura, setAltura] = useState(180);
  const [idade, setIdade] = useState(30);
  const [sexo, setSexo] = useState("masculino");

  const [peito, setPeito] = useState(110);
  const [cintura, setCintura] = useState(110);
  const [quadril, setQuadril] = useState(110);
  const [ombros, setOmbros] = useState(120);

  const [gordura, setGordura] = useState("");
  const [massaMuscular, setMassaMuscular] = useState("");

  const [nivelAtividade, setNivelAtividade] = useState(1.2);
  const [esporteSelecionado, setEsporteSelecionado] = useState("Musculação");
  const [metabolismoExtra, setMetabolismoExtra] = useState(0);
  const [esportesDiario, setEsportesDiario] = useState([]);

  const [alimentoSelecionado, setAlimentoSelecionado] = useState("Frango grelhado");
  const [quantidadeAlimento, setQuantidadeAlimento] = useState(100);
  const [diarioAlimentar, setDiarioAlimentar] = useState([]);

  const [buffs, setBuffs] = useState(initialBuffs);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const salvo = localStorage.getItem("kiquest-master-save");

    if (salvo) {
      try {
        const d = JSON.parse(salvo);

        setNome(d.nome ?? "Guerreiro Ki");
        setClasse(d.classe ?? "Aprendiz do Corpo");
        setAvatar(d.avatar ?? "⚔️");
        setXp(d.xp ?? 0);
        setLevel(d.level ?? 1);
        setStats(d.stats ?? initialStats);

        setPeso(d.peso ?? 113);
        setPesoAnterior(d.pesoAnterior ?? 113);
        setAltura(d.altura ?? 180);
        setIdade(d.idade ?? 30);
        setSexo(d.sexo ?? "masculino");

        setPeito(d.peito ?? 110);
        setCintura(d.cintura ?? 110);
        setQuadril(d.quadril ?? 110);
        setOmbros(d.ombros ?? 120);

        setGordura(d.gordura ?? "");
        setMassaMuscular(d.massaMuscular ?? "");

        setNivelAtividade(d.nivelAtividade ?? 1.2);
        setEsporteSelecionado(d.esporteSelecionado ?? "Musculação");
        setMetabolismoExtra(d.metabolismoExtra ?? 0);
        setEsportesDiario(d.esportesDiario ?? []);

        setAlimentoSelecionado(d.alimentoSelecionado ?? "Frango grelhado");
        setQuantidadeAlimento(d.quantidadeAlimento ?? 100);
        setDiarioAlimentar(d.diarioAlimentar ?? []);

        setBuffs(d.buffs ?? initialBuffs);
        setHistorico(d.historico ?? []);
      } catch {
        alert("Erro ao carregar dados salvos.");
      }
    }

    setCarregado(true);
  }, []);

  useEffect(() => {
    if (!carregado) return;

    localStorage.setItem(
      "kiquest-master-save",
      JSON.stringify({
        nome,
        classe,
        avatar,
        xp,
        level,
        stats,
        peso,
        pesoAnterior,
        altura,
        idade,
        sexo,
        peito,
        cintura,
        quadril,
        ombros,
        gordura,
        massaMuscular,
        nivelAtividade,
        esporteSelecionado,
        metabolismoExtra,
        esportesDiario,
        alimentoSelecionado,
        quantidadeAlimento,
        diarioAlimentar,
        buffs,
        historico,
      })
    );
  }, [
    carregado,
    nome,
    classe,
    avatar,
    xp,
    level,
    stats,
    peso,
    pesoAnterior,
    altura,
    idade,
    sexo,
    peito,
    cintura,
    quadril,
    ombros,
    gordura,
    massaMuscular,
    nivelAtividade,
    esporteSelecionado,
    metabolismoExtra,
    esportesDiario,
    alimentoSelecionado,
    quantidadeAlimento,
    diarioAlimentar,
    buffs,
    historico,
  ]);

  function snapshot() {
    return {
      xp,
      level,
      stats,
      peso,
      pesoAnterior,
      metabolismoExtra,
      esportesDiario,
      diarioAlimentar,
      buffs,
    };
  }

  function salvarHistorico() {
    setHistorico((h) => [...h, snapshot()]);
  }

  function aplicarXp(valor, tipo) {
    let novoXp = xp + valor;
    let novoLevel = level;

    while (novoXp >= novoLevel * 100) {
      novoXp -= novoLevel * 100;
      novoLevel += 1;
    }

    setXp(novoXp);
    setLevel(novoLevel);

    if (tipo) {
      setStats((s) => ({
        ...s,
        [tipo]: (s[tipo] || 0) + 1,
      }));
    }
  }

  function ganharXp(valor, tipo, texto = "Deseja adicionar esta ação ao personagem?") {
    if (!window.confirm(texto)) return;
    salvarHistorico();
    aplicarXp(valor, tipo);
  }

  function desfazerUltimaAcao() {
    if (historico.length === 0) return alert("Nada para desfazer.");
    if (!window.confirm("Retirar a última ação/habilidade adicionada?")) return;

    const ultimo = historico[historico.length - 1];

    setXp(ultimo.xp);
    setLevel(ultimo.level);
    setStats(ultimo.stats);
    setPeso(ultimo.peso);
    setPesoAnterior(ultimo.pesoAnterior);
    setMetabolismoExtra(ultimo.metabolismoExtra);
    setEsportesDiario(ultimo.esportesDiario);
    setDiarioAlimentar(ultimo.diarioAlimentar);
    setBuffs(ultimo.buffs);
    setHistorico((h) => h.slice(0, -1));
  }

  function atualizarPeso(novoPeso) {
    const valor = Number(novoPeso);
    setPeso(novoPeso);

    if (!valor || valor <= 0) return;

    const perda = Number(pesoAnterior) - valor;

    if (perda > 0) {
      if (window.confirm(`Você perdeu ${perda.toFixed(1)} kg. Adicionar bônus de Disposição e XP?`)) {
        salvarHistorico();
        setStats((s) => ({ ...s, disposicao: s.disposicao + Math.ceil(perda) }));
        aplicarXp(Math.ceil(perda * 50), "disposicao");
      }
    }

    setPesoAnterior(valor);
  }

  function adicionarEsporte() {
    const esporte = esportesBase.find((e) => e[0] === esporteSelecionado);
    if (!esporte) return;
    if (!window.confirm(`Adicionar ${esporte[0]} (+${esporte[1]} kcal e +Resistência)?`)) return;

    salvarHistorico();

    const item = {
      id: Date.now(),
      nome: esporte[0],
      kcal: esporte[1],
    };

    setEsportesDiario((lista) => [...lista, item]);
    setMetabolismoExtra((v) => v + esporte[1]);
    aplicarXp(60, "resistencia");
  }

  function removerEsporte(id) {
    const item = esportesDiario.find((e) => e.id === id);
    if (!item) return;
    if (!window.confirm(`Retirar ${item.nome}?`)) return;

    salvarHistorico();
    setEsportesDiario((lista) => lista.filter((e) => e.id !== id));
    setMetabolismoExtra((v) => Math.max(0, v - item.kcal));
  }

  function adicionarAlimento() {
    const alimento = alimentosBase.find((a) => a.nome === alimentoSelecionado);
    const g = Number(quantidadeAlimento);

    if (!alimento || !g || g <= 0) return alert("Informe alimento e quantidade válidos.");
    if (!window.confirm("Adicionar este alimento ao diário nutricional?")) return;

    salvarHistorico();

    const fator = g / 100;

    const novoItem = {
      id: Date.now(),
      nome: alimento.nome,
      quantidade: g,
      calorias: Math.round(alimento.cal * fator),
      proteina: Number((alimento.prot * fator).toFixed(1)),
      carboidrato: Number((alimento.carb * fator).toFixed(1)),
      gordura: Number((alimento.gord * fator).toFixed(1)),
    };

    setDiarioAlimentar((lista) => [...lista, novoItem]);
    aplicarXp(40, "nutricao");
  }

  function removerAlimento(id) {
    const item = diarioAlimentar.find((a) => a.id === id);
    if (!item) return;
    if (!window.confirm(`Retirar ${item.nome}?`)) return;

    salvarHistorico();
    setDiarioAlimentar((lista) => lista.filter((a) => a.id !== id));
  }

  function resetarDiarioAlimentar() {
    if (!window.confirm("Limpar todo o diário alimentar?")) return;
    salvarHistorico();
    setDiarioAlimentar([]);
  }

  function alternarBuff(nomeBuff) {
    const ativar = !buffs[nomeBuff];
    if (!window.confirm(`${ativar ? "Ativar" : "Retirar"} buff ${nomeBuff}?`)) return;

    salvarHistorico();
    setBuffs((b) => ({ ...b, [nomeBuff]: ativar }));
  }

  function resetarTudo() {
    if (!window.confirm("ATENÇÃO: resetar todo o progresso?")) return;
    localStorage.removeItem("kiquest-master-save");
    window.location.reload();
  }

  const xpMax = level * 100;
  const progresso = Math.min(100, Math.floor((xp / xpMax) * 100));

  const imc = useMemo(() => {
    const a = Number(altura) / 100;
    return a > 0 ? Number((Number(peso) / (a * a)).toFixed(1)) : 0;
  }, [peso, altura]);

  const biotipoAutomatico = useMemo(() => {
    const p = Number(peito) || 0;
    const c = Number(cintura) || 0;
    const q = Number(quadril) || 0;
    const o = Number(ombros) || 0;

    if (!p || !c || !q || !o) return "Indefinido";

    const ombroCintura = o / c;
    const peitoCintura = p / c;
    const cinturaQuadril = c / q;

    let ecto = 0;
    let meso = 0;
    let endo = 0;

    if (imc < 22) ecto += 2;
    if (imc >= 22 && imc < 27) meso += 2;
    if (imc >= 27) endo += 2;

    if (ombroCintura >= 1.25) meso += 2;
    else ecto += 1;

    if (peitoCintura >= 1.1) meso += 1;
    if (cinturaQuadril >= 0.95) endo += 2;
    if (cinturaQuadril < 0.85 && imc < 24) ecto += 1;

    const maior = Math.max(ecto, meso, endo);
    if (maior === meso) return "Mesomorfo";
    if (maior === ecto) return "Ectomorfo";
    return "Endomorfo";
  }, [peito, cintura, quadril, ombros, imc]);

  const tmb = useMemo(() => {
    const p = Number(peso) || 0;
    const a = Number(altura) || 0;
    const i = Number(idade) || 0;

    return sexo === "masculino"
      ? 10 * p + 6.25 * a - 5 * i + 5
      : 10 * p + 6.25 * a - 5 * i - 161;
  }, [peso, altura, idade, sexo]);

  const gastoDiarioEstimado = Math.round(tmb * Number(nivelAtividade));
  const metabolismoTotal = gastoDiarioEstimado + Number(metabolismoExtra);

  const totais = useMemo(() => {
    return diarioAlimentar.reduce(
      (acc, item) => ({
        calorias: acc.calorias + item.calorias,
        proteina: acc.proteina + item.proteina,
        carboidrato: acc.carboidrato + item.carboidrato,
        gordura: acc.gordura + item.gordura,
      }),
      { calorias: 0, proteina: 0, carboidrato: 0, gordura: 0 }
    );
  }, [diarioAlimentar]);

  const saldoCalorico = metabolismoTotal - totais.calorias;

  const classeEvoluida = useMemo(() => {
    if (level >= 30) return "Lenda do Ki Supremo";
    if (level >= 20) return "Cavaleiro Ascendido";
    if (level >= 15) return "Guardião da Transformação";
    if (level >= 10) return "Guerreiro da Disciplina";
    if (level >= 5) return "Aprendiz Evoluído";
    return classe;
  }, [level, classe]);

  const atributosGerais = useMemo(() => {
    const atributos = {
      Força: 8 + stats.forca * 2,
      Destreza: 8 + stats.resistencia + stats.disposicao,
      Constituição: 8 + stats.vitalidade * 2 + stats.resistencia,
      Inteligência: 8 + stats.disciplina,
      Sabedoria: 8 + stats.nutricao + stats.disciplina,
      Carisma: 8 + stats.disposicao,
    };

    if (biotipoAutomatico === "Mesomorfo") atributos.Força += 2;
    if (biotipoAutomatico === "Ectomorfo") atributos.Destreza += 2;
    if (biotipoAutomatico === "Endomorfo") atributos.Constituição += 2;

    if (buffs.creatina) atributos.Força += 2;
    if (buffs.bcaa) atributos.Constituição += 1;
    if (buffs.preTreino) atributos.Destreza += 2;
    if (buffs.mounjaro) atributos.Sabedoria += 2;

    return atributos;
  }, [stats, biotipoAutomatico, buffs]);

  const estamina = useMemo(() => {
    let base = 50 + stats.resistencia * 6 + stats.disposicao * 4 + stats.vitalidade * 5;

    if (buffs.creatina) base += 8;
    if (buffs.bcaa) base += 5;
    if (buffs.preTreino) base += 15;
    if (saldoCalorico < -700) base -= 10;
    if (saldoCalorico > 300) base += 5;

    return Math.max(10, Math.round(base));
  }, [stats, buffs, saldoCalorico]);

  const habilidades = useMemo(() => {
    const lista = ["Registro de Jornada"];

    if (level >= 3) lista.push("Foco Inicial");
    if (level >= 5) lista.push("Metabolismo Ativo");
    if (level >= 10) lista.push("Modo Disciplina");
    if (level >= 15) lista.push("Ki Corporal");
    if (level >= 20) lista.push("Transformação Parcial");
    if (level >= 30) lista.push("Forma Lendária");

    if (stats.nutricao >= 5) lista.push("Mestre da Nutrição");
    if (stats.forca >= 5) lista.push("Golpe de Ferro");
    if (stats.resistencia >= 5) lista.push("Fôlego de Dragão");
    if (stats.disposicao >= 5) lista.push("Aura de Energia");

    if (buffs.creatina) lista.push("Buff: Creatina");
    if (buffs.bcaa) lista.push("Buff: BCAA");
    if (buffs.preTreino) lista.push("Buff: Pré-treino");
    if (buffs.mounjaro) lista.push("Buff: Mounjaro");

    return lista;
  }, [level, stats, buffs]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>⚔️ KiQuest RPG Fitness</h1>
        <p style={styles.slogan}>
          Forje seu corpo como uma lenda. Cada refeição, treino e escolha desperta seu Ki.
        </p>

        <div style={styles.grid}>
          <section style={styles.card}>
            <h2>🧙 Criar Personagem</h2>
            <div style={styles.avatar}>{avatar}</div>

            <label>Nome</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} style={styles.input} />

            <label>Classe base</label>
            <select value={classe} onChange={(e) => setClasse(e.target.value)} style={styles.input}>
              <option>Aprendiz do Corpo</option>
              <option>Guerreiro da Disciplina</option>
              <option>Monge da Nutrição</option>
              <option>Caçador de Energia</option>
              <option>Cavaleiro do Ki</option>
            </select>

            <label>Avatar</label>
            <select value={avatar} onChange={(e) => setAvatar(e.target.value)} style={styles.input}>
              <option>⚔️</option>
              <option>🛡️</option>
              <option>🐉</option>
              <option>🔥</option>
              <option>🧙‍♂️</option>
              <option>💪</option>
              <option>🦁</option>
              <option>👑</option>
            </select>
          </section>

          <section style={styles.card}>
            <h2>{avatar} {nome}</h2>
            <p style={styles.badge}>{classeEvoluida}</p>

            <h2>Level {level}</h2>
            <p>XP: {xp} / {xpMax}</p>

            <div style={styles.xpBar}>
              <div style={{ ...styles.xpFill, width: `${progresso}%` }}>{progresso}%</div>
            </div>

            <h3>📊 Status</h3>
            <p>💪 Força: {stats.forca}</p>
            <p>🥗 Nutrição: {stats.nutricao}</p>
            <p>🧠 Disciplina: {stats.disciplina}</p>
            <p>🏃 Resistência: {stats.resistencia}</p>
            <p>⚡ Disposição: {stats.disposicao}</p>
            <p>❤️ Vitalidade: {stats.vitalidade}</p>
          </section>
        </div>

        <section style={styles.card}>
          <h2>🏰 Resultado Final da Build</h2>

          <div style={styles.grid3}>
            <p>🧬 Biotipo automático: <strong>{biotipoAutomatico}</strong></p>
            <p>⚖️ IMC: <strong>{imc}</strong></p>
            <p>🔥 TMB: <strong>{Math.round(tmb)} kcal</strong></p>
            <p>👑 Metabolismo total: <strong>{metabolismoTotal} kcal</strong></p>
            <p>🍗 Calorias ingeridas: <strong>{totais.calorias} kcal</strong></p>
            <p>⚔️ Saldo calórico: <strong>{saldoCalorico} kcal</strong></p>
            <p>⚡ Estamina: <strong>{estamina}</strong></p>
            <p>🎖️ Classe atual: <strong>{classeEvoluida}</strong></p>
          </div>

          <h3>🎲 Atributos Gerais</h3>
          <div style={styles.attributes}>
            {Object.entries(atributosGerais).map(([nomeAttr, valor]) => (
              <div key={nomeAttr} style={styles.attributeBox}>
                <span>{nomeAttr}</span>
                <strong>{valor}</strong>
              </div>
            ))}
          </div>

          <h3>✨ Habilidades Adquiridas</h3>
          <div style={styles.skillList}>
            {habilidades.map((h) => (
              <span key={h} style={styles.skill}>{h}</span>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <h2>⚖️ Bioimpedância e Biotipo Automático</h2>

          <div style={styles.grid3}>
            <div><label>Peso atual (kg)</label><input type="number" value={peso} onChange={(e) => atualizarPeso(e.target.value)} style={styles.input} /></div>
            <div><label>Altura (cm)</label><input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} style={styles.input} /></div>
            <div><label>Idade</label><input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} style={styles.input} /></div>
            <div><label>Sexo</label><select value={sexo} onChange={(e) => setSexo(e.target.value)} style={styles.input}><option value="masculino">Masculino</option><option value="feminino">Feminino</option></select></div>
            <div><label>Peito (cm)</label><input type="number" value={peito} onChange={(e) => setPeito(e.target.value)} style={styles.input} /></div>
            <div><label>Cintura (cm)</label><input type="number" value={cintura} onChange={(e) => setCintura(e.target.value)} style={styles.input} /></div>
            <div><label>Quadril (cm)</label><input type="number" value={quadril} onChange={(e) => setQuadril(e.target.value)} style={styles.input} /></div>
            <div><label>Ombros (cm)</label><input type="number" value={ombros} onChange={(e) => setOmbros(e.target.value)} style={styles.input} /></div>
            <div><label>% Gordura</label><input type="number" value={gordura} onChange={(e) => setGordura(e.target.value)} style={styles.input} /></div>
            <div><label>Massa muscular (kg)</label><input type="number" value={massaMuscular} onChange={(e) => setMassaMuscular(e.target.value)} style={styles.input} /></div>
          </div>
        </section>

        <section style={styles.card}>
          <h2>🧪 Buffs Ativos</h2>
          <button onClick={() => alternarBuff("mounjaro")} style={btn(buffs.mounjaro ? "#15803d" : "#57534e")}>Mounjaro: {buffs.mounjaro ? "Ativo" : "Inativo"}</button>
          <button onClick={() => alternarBuff("creatina")} style={btn(buffs.creatina ? "#15803d" : "#57534e")}>Creatina: {buffs.creatina ? "Ativo" : "Inativo"}</button>
          <button onClick={() => alternarBuff("bcaa")} style={btn(buffs.bcaa ? "#15803d" : "#57534e")}>BCAA: {buffs.bcaa ? "Ativo" : "Inativo"}</button>
          <button onClick={() => alternarBuff("preTreino")} style={btn(buffs.preTreino ? "#15803d" : "#57534e")}>Pré-treino: {buffs.preTreino ? "Ativo" : "Inativo"}</button>
        </section>

        <section style={styles.card}>
          <h2>🍗 Diário Alimentar RPG</h2>

          <div style={styles.grid3}>
            <div>
              <label>Alimento</label>
              <select value={alimentoSelecionado} onChange={(e) => setAlimentoSelecionado(e.target.value)} style={styles.input}>
                {alimentosBase.map((a) => <option key={a.nome}>{a.nome}</option>)}
              </select>
            </div>

            <div>
              <label>Quantidade (g/ml)</label>
              <input type="number" value={quantidadeAlimento} onChange={(e) => setQuantidadeAlimento(e.target.value)} style={styles.input} />
            </div>

            <div>
              <label>Ação</label>
              <button onClick={adicionarAlimento} style={btn("#1d4ed8")}>🍽️ Adicionar alimento</button>
            </div>
          </div>

          <div style={styles.nutriBox}>
            <p>🔥 Calorias: {totais.calorias} kcal</p>
            <p>💪 Proteína: {totais.proteina.toFixed(1)} g</p>
            <p>🍞 Carboidrato: {totais.carboidrato.toFixed(1)} g</p>
            <p>🥑 Gordura: {totais.gordura.toFixed(1)} g</p>
          </div>

          {diarioAlimentar.map((item) => (
            <div key={item.id} style={styles.listItem}>
              <span>{item.nome} — {item.quantidade}g | {item.calorias} kcal | P {item.proteina}g | C {item.carboidrato}g</span>
              <button onClick={() => removerAlimento(item.id)} style={miniBtn("#991b1b")}>Retirar</button>
            </div>
          ))}

          {diarioAlimentar.length > 0 && (
            <button onClick={resetarDiarioAlimentar} style={btn("#7f1d1d")}>🗑️ Limpar diário alimentar</button>
          )}
        </section>

        <section style={styles.card}>
          <h2>🔥 Metabolismo e Esportes</h2>

          <label>Nível de atividade</label>
          <select value={nivelAtividade} onChange={(e) => setNivelAtividade(e.target.value)} style={styles.input}>
            <option value={1.2}>Sedentário</option>
            <option value={1.375}>Levemente ativo</option>
            <option value={1.55}>Moderadamente ativo</option>
            <option value={1.725}>Muito ativo</option>
            <option value={1.9}>Extremamente ativo</option>
          </select>

          <p>🧬 TMB estimada: {Math.round(tmb)} kcal/dia</p>
          <p>🔥 Gasto diário estimado: {gastoDiarioEstimado} kcal/dia</p>
          <p>⚔️ Metabolismo extra: {metabolismoExtra} kcal</p>
          <p>👑 Total com esportes: {metabolismoTotal} kcal</p>

          <label>Esporte praticado</label>
          <select value={esporteSelecionado} onChange={(e) => setEsporteSelecionado(e.target.value)} style={styles.input}>
            {esportesBase.map((e) => <option key={e[0]}>{e[0]}</option>)}
          </select>

          <button onClick={adicionarEsporte} style={btn("#b45309")}>🏆 Adicionar esporte</button>

          {esportesDiario.map((item) => (
            <div key={item.id} style={styles.listItem}>
              <span>{item.nome} — {item.kcal} kcal</span>
              <button onClick={() => removerEsporte(item.id)} style={miniBtn("#991b1b")}>Retirar</button>
            </div>
          ))}
        </section>

        <section style={styles.card}>
          <h2>🎯 Ações do Dia</h2>
          <button onClick={() => ganharXp(80, "forca", "Confirmar treino e adicionar Força?")} style={btn("#15803d")}>🏋️ Treino (+80 XP)</button>
          <button onClick={() => ganharXp(50, "nutricao", "Confirmar alimentação positiva?")} style={btn("#1d4ed8")}>🍗 Comer bem (+50 XP)</button>
          <button onClick={() => ganharXp(30, "disciplina", "Confirmar creatina?")} style={btn("#7e22ce")}>💊 Creatina (+30 XP)</button>
          <button onClick={() => ganharXp(40, "resistencia", "Confirmar movimento?")} style={btn("#c2410c")}>🚶 Movimento (+40 XP)</button>
          <button onClick={() => ganharXp(70, "disposicao", "Confirmar bônus de disposição?")} style={btn("#ca8a04")}>⚡ Disposição (+70 XP)</button>
          <button onClick={() => ganharXp(45, "vitalidade", "Confirmar bem-estar?")} style={btn("#0f766e")}>❤️ Bem-estar (+45 XP)</button>
          <button onClick={desfazerUltimaAcao} style={btn("#991b1b")}>↩️ Retirar última ação</button>
          <button onClick={resetarTudo} style={btn("#450a0a")}>☠️ Resetar tudo</button>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Georgia, serif",
    color: "#fff7ed",
    background: "radial-gradient(circle at top, #92400e, #1c1917 45%, #020617)",
  },
  container: { maxWidth: "1150px", margin: "0 auto" },
  title: {
    textAlign: "center",
    fontSize: "50px",
    marginBottom: "5px",
    color: "#facc15",
    textShadow: "0 0 18px #f97316, 0 0 42px #7c2d12",
  },
  slogan: { textAlign: "center", color: "#fed7aa", marginBottom: "30px", fontSize: "18px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" },
  grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" },
  card: {
    background: "linear-gradient(145deg, rgba(41,37,36,0.97), rgba(12,10,9,0.97))",
    padding: "24px",
    borderRadius: "24px",
    border: "1px solid rgba(250,204,21,0.38)",
    boxShadow: "0 25px 70px rgba(0,0,0,0.7), 0 0 28px rgba(234,88,12,0.25)",
    marginBottom: "22px",
  },
  avatar: {
    width: "125px",
    height: "125px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "60px",
    margin: "15px auto",
    background: "linear-gradient(135deg, #92400e, #f59e0b, #7c2d12)",
    boxShadow: "0 0 45px rgba(250,204,21,0.8)",
    border: "2px solid #facc15",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "8px 0 15px",
    borderRadius: "12px",
    border: "1px solid #f59e0b",
    background: "#1c1917",
    color: "#fff7ed",
    fontWeight: "bold",
    boxSizing: "border-box",
  },
  badge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #92400e, #f59e0b)",
    fontWeight: "bold",
    boxShadow: "0 0 18px rgba(245,158,11,0.65)",
  },
  xpBar: {
    width: "100%",
    height: "28px",
    background: "#292524",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "25px",
    border: "1px solid #facc15",
    boxShadow: "inset 0 0 12px rgba(0,0,0,0.8)",
  },
  xpFill: {
    height: "100%",
    background: "linear-gradient(90deg, #ca8a04, #facc15, #f97316)",
    textAlign: "center",
    fontSize: "13px",
    fontWeight: "bold",
    lineHeight: "28px",
    transition: "width 0.4s ease",
    color: "#1c1917",
  },
  nutriBox: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
    background: "rgba(0,0,0,0.25)",
    border: "1px solid rgba(250,204,21,0.25)",
    borderRadius: "16px",
    padding: "15px",
    margin: "15px 0",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    background: "rgba(0,0,0,0.28)",
    padding: "10px",
    borderRadius: "12px",
    margin: "8px 0",
    border: "1px solid rgba(250,204,21,0.18)",
  },
  attributes: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" },
  attributeBox: {
    background: "rgba(0,0,0,0.32)",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(250,204,21,0.25)",
    display: "flex",
    justifyContent: "space-between",
  },
  skillList: { display: "flex", flexWrap: "wrap", gap: "10px" },
  skill: {
    background: "linear-gradient(90deg, #78350f, #ca8a04)",
    padding: "8px 12px",
    borderRadius: "999px",
    border: "1px solid #facc15",
    fontWeight: "bold",
  },
};

function btn(cor) {
  return {
    display: "block",
    width: "100%",
    padding: "14px",
    margin: "12px 0",
    background: cor,
    color: "white",
    border: "1px solid rgba(250,204,21,0.45)",
    borderRadius: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 14px 30px rgba(0,0,0,0.5), 0 0 18px rgba(250,204,21,0.2)",
  };
}

function miniBtn(cor) {
  return {
    padding: "8px 10px",
    background: cor,
    color: "white",
    border: "1px solid rgba(250,204,21,0.35)",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  };
}

export default App;