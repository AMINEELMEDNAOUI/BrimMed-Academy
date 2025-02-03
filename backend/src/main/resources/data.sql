INSERT INTO matiers (idMat, nomMat, prix) VALUES (1, 'Maths', 150) ON DUPLICATE KEY UPDATE nomMat='Maths', prix=150;
INSERT INTO matiers (idMat, nomMat, prix) VALUES (2, 'Physics & Chemistry', 150) ON DUPLICATE KEY UPDATE nomMat='Physics & Chemistry', prix=150;
INSERT INTO matiers (idMat, nomMat, prix) VALUES (3, 'SVT', 150) ON DUPLICATE KEY UPDATE nomMat='SVT', prix=150;
