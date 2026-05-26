# โครงสร้างข้อมูลและอัลกอริทึมเบื้องต้น (21900-1002)

## Unit 1: หลักการทางโครงสร้างข้อมูลและอัลกอริทึม
- 1.1 ความหมายและบทบาทของโครงสร้างข้อมูลในการเขียนโปรแกรม
- 1.2 ความสำคัญของโครงสร้างข้อมูลต่อประสิทธิภาพของซอฟต์แวร์
- 1.3 ประเภทของโครงสร้างข้อมูล
  - 1.3.1 ข้อมูลแบบพื้นฐาน (Primitive Data Types)
  - 1.3.2 โครงสร้างข้อมูลแบบเชิงเส้น (Linear Data Structure)
  - 1.3.3 โครงสร้างข้อมูลแบบไม่เชิงเส้น (Non-Linear Data Structure)
- 1.4 ความหมายและคุณสมบัติของอัลกอริทึมที่ดี
- 1.5 วงจรการพัฒนาอัลกอริทึม (Algorithm Development Cycle)
- 1.6 การวิเคราะห์ประสิทธิภาพเบื้องต้น (Algorithm Analysis)
  - 1.6.1 Time Complexity และ Space Complexity
  - 1.6.2 สัญกรณ์ Big O (Big O Notation) เบื้องต้น
- 1.7 ทบทวนภาษา Python สำหรับโครงสร้างข้อมูล
  - 1.7.1 ตัวแปร, ลูป, และเงื่อนไข
  - 1.7.2 ฟังก์ชันและการจัดการข้อผิดพลาด (Exception Handling)
  - 1.7.3 การเขียนโปรแกรมเชิงวัตถุ (OOP) เบื้องต้นใน Python
- 1.8 Built-in Data Types ของ Python
  - 1.8.1 List และการประยุกต์ใช้
  - 1.8.2 Tuple และข้อจำกัด
  - 1.8.3 Dictionary และหลักการทำงาน (Hashing)
  - 1.8.4 Set และทฤษฎีเซต

## Unit 2: Array และ Linked List
- 2.1 โครงสร้างข้อมูลแบบ Array
  - 2.1.1 หลักการทำงานและการจัดสรรหน่วยความจำ (Memory Allocation)
  - 2.1.2 Array 1 มิติ และ 2 มิติ
  - 2.1.3 การเข้าถึงข้อมูล (Access) แบบสุ่ม (Random Access)
  - 2.1.4 การค้นหา (Search), การเพิ่ม (Insert), การลบ (Delete) ข้อมูลใน Array
  - 2.1.5 ข้อดีและข้อจำกัดของ Array
- 2.2 โครงสร้างข้อมูลแบบ Linked List (รายการเชื่อมโยง)
  - 2.2.1 แนวคิดของ Node (Data และ Pointer/Reference)
  - 2.2.2 การจองหน่วยความจำแบบพลวัต (Dynamic Memory Allocation)
- 2.3 Singly Linked List (รายการเชื่อมโยงทางเดียว)
  - 2.3.1 การสร้าง Node และการเชื่อมโยง
  - 2.3.2 การแทรกข้อมูล (ที่หัว, ที่ท้าย, ตรงกลาง)
  - 2.3.3 การลบข้อมูล (ที่หัว, ที่ท้าย, ตรงกลาง)
  - 2.3.4 การท่องไปใน Linked List (Traversal) และการค้นหา
- 2.4 Doubly Linked List (รายการเชื่อมโยงสองทาง)
  - 2.4.1 หลักการของ Previous และ Next Pointer
  - 2.4.2 การเพิ่มและลบข้อมูลใน Doubly Linked List
- 2.5 Circular Linked List เบื้องต้น
- 2.6 การเปรียบเทียบประสิทธิภาพระหว่าง Array กับ Linked List (Time Complexity)

## Unit 3: Stack และ Queue
- 3.1 โครงสร้างข้อมูลแบบ Stack (สแต็ก)
  - 3.1.1 หลักการทำงานแบบ LIFO (Last-In First-Out)
  - 3.1.2 การใช้งานพื้นฐาน: Push, Pop, Peek/Top, isEmpty, isFull
- 3.2 การเขียนโปรแกรม (Implementation) สร้าง Stack
  - 3.2.1 การใช้ Array (List ใน Python) สร้าง Stack
  - 3.2.2 การใช้ Linked List สร้าง Stack
- 3.3 การประยุกต์ใช้งาน Stack
  - 3.3.1 ระบบเลิกทำ (Undo Mechanism)
  - 3.3.2 การตรวจสอบวงเล็บ (Balanced Parentheses)
  - 3.3.3 การประมวลผลนิพจน์ (Infix, Prefix, Postfix Expression)
- 3.4 โครงสร้างข้อมูลแบบ Queue (คิว)
  - 3.4.1 หลักการทำงานแบบ FIFO (First-In First-Out)
  - 3.4.2 การใช้งานพื้นฐาน: Enqueue, Dequeue, Front/Peek, Rear, isEmpty
- 3.5 การเขียนโปรแกรม (Implementation) สร้าง Queue
  - 3.5.1 การใช้ Array สร้าง Queue และปัญหาคิวเลื่อน
  - 3.5.2 การใช้ Linked List สร้าง Queue
- 3.6 โครงสร้างข้อมูลแบบ Circular Queue (คิววงกลม)
  - 3.6.1 หลักการทำงานและการแก้ปัญหาคิวเต็มหลอก
  - 3.6.2 การคำนวณตำแหน่ง Front และ Rear
- 3.7 โครงสร้างข้อมูลแบบ Priority Queue (คิวลำดับความสำคัญ)
  - 3.7.1 หลักการทำงานและการนำไปใช้
- 3.8 โครงสร้างข้อมูลแบบ Deque (Double-Ended Queue) เบื้องต้น

## Unit 4: Tree (ต้นไม้)
- 4.1 แนวคิดของโครงสร้างข้อมูลแบบ Tree
- 4.2 ศัพท์พื้นฐานของ Tree (Terminology)
  - 4.2.1 Root, Node, Edge
  - 4.2.2 Parent, Child, Sibling, Ancestor, Descendant
  - 4.2.3 Leaf Node, Internal Node
  - 4.2.4 Path, Degree, Depth, Height, Level
- 4.3 โครงสร้าง Binary Tree (ต้นไม้ทวิภาค)
  - 4.3.1 คุณสมบัติและประเภทของ Binary Tree (Full, Complete, Perfect)
  - 4.3.2 การแทนที่ Binary Tree ในหน่วยความจำ (Array vs Linked Representation)
- 4.4 โครงสร้าง Binary Search Tree (BST)
  - 4.4.1 คุณสมบัติและกฎของ BST
  - 4.4.2 การดำเนินการบน BST: Insert, Search, Min/Max
  - 4.4.3 การลบข้อมูล (Delete) บน BST (3 กรณี: ใบ, ลูกหนึ่ง, ลูกสอง)
- 4.5 การท่องไปใน Tree (Tree Traversal)
  - 4.5.1 Depth-First Traversal: Inorder, Preorder, Postorder
  - 4.5.2 Breadth-First Traversal: Level-order (ใช้ Queue)
- 4.6 โครงสร้างข้อมูลแบบ Heap และ AVL Tree เบื้องต้น
  - 4.6.1 Min-Heap และ Max-Heap
  - 4.6.2 แนวคิดของ Self-Balancing Tree (AVL Tree)
- 4.7 การประยุกต์ใช้ Tree
  - 4.7.1 โครงสร้างระบบไฟล์ (File System)
  - 4.7.2 โครงสร้าง DOM (Document Object Model)
  - 4.7.3 แผนผังตัดสินใจ (Decision Tree)

## Unit 5: Graph (กราฟ)
- 5.1 แนวคิดของโครงสร้างข้อมูลแบบ Graph
- 5.2 องค์ประกอบและคำศัพท์ของ Graph
  - 5.2.1 Vertex (Node) และ Edge (เส้นเชื่อม)
  - 5.2.2 Adjacent, Degree (In-degree, Out-degree)
  - 5.2.3 Path, Cycle, Connected Graph
- 5.3 ประเภทของ Graph
  - 5.3.1 กราฟระบุทิศทาง (Directed Graph / Digraph) และ ไม่ระบุทิศทาง (Undirected Graph)
  - 5.3.2 กราฟถ่วงน้ำหนัก (Weighted Graph) และ ไม่ถ่วงน้ำหนัก (Unweighted Graph)
- 5.4 การแทนที่ Graph ในหน่วยความจำ
  - 5.4.1 Adjacency Matrix (เมทริกซ์ประชิด)
  - 5.4.2 Adjacency List (รายการประชิด)
  - 5.4.3 การเปรียบเทียบ Space Complexity
- 5.5 การท่องไปใน Graph (Graph Traversal)
  - 5.5.1 Breadth-First Search (BFS) โดยใช้ Queue
  - 5.5.2 Depth-First Search (DFS) โดยใช้ Stack หรือ Recursion
- 5.6 อัลกอริทึมเกี่ยวกับ Graph เบื้องต้น
  - 5.6.1 อัลกอริทึมเส้นทางที่สั้นที่สุด (Shortest Path - Dijkstra's Algorithm เบื้องต้น)
  - 5.6.2 อัลกอริทึมหาต้นไม้แผ่กิ่งที่น้อยที่สุด (Minimum Spanning Tree)
- 5.7 การประยุกต์ใช้ Graph
  - 5.7.1 ระบบนำทาง (Google Maps)
  - 5.7.2 เครือข่ายสังคมออนไลน์ (Social Network)
  - 5.7.3 ระบบแนะนำข้อมูล (Recommendation System)

## Unit 6: Sorting และ Searching (การจัดเรียงและการค้นหาข้อมูล)
- 6.1 อัลกอริทึมการค้นหาข้อมูล (Searching Algorithms)
  - 6.1.1 Linear Search (การค้นหาแบบตามลำดับ)
  - 6.1.2 Binary Search (การค้นหาแบบทวิภาค) และข้อกำหนด
  - 6.1.3 เปรียบเทียบประสิทธิภาพ O(n) vs O(log n)
- 6.2 อัลกอริทึมการจัดเรียงข้อมูลแบบพื้นฐาน (O(n²))
  - 6.2.1 Bubble Sort (การจัดเรียงแบบฟอง)
  - 6.2.2 Selection Sort (การจัดเรียงแบบเลือก)
  - 6.2.3 Insertion Sort (การจัดเรียงแบบแทรก)
- 6.3 อัลกอริทึมการจัดเรียงข้อมูลแบบขั้นสูง (O(n log n))
  - 6.3.1 แนวคิด Divide and Conquer
  - 6.3.2 Merge Sort (การจัดเรียงแบบผสาน)
  - 6.3.3 Quick Sort (การจัดเรียงแบบรวดเร็ว) และ Pivot
- 6.4 การจัดเรียงข้อมูลแบบอื่น ๆ (ตัวเลือกเสริม)
  - 6.4.1 Counting Sort หรือ Radix Sort
- 6.5 การเปรียบเทียบ Big O ของอัลกอริทึมการจัดเรียง
- 6.6 การใช้งานฟังก์ชันค้นหาและจัดเรียงที่มีให้ใน Python
  - 6.6.1 `sort()` method และ `sorted()` function
  - 6.6.2 การใช้ `lambda` ในการจัดเรียงแบบ Custom

## Unit 7: การประยุกต์ใช้ในงานอาชีพ (Mini Project)
- 7.1 หลักการเลือกใช้โครงสร้างข้อมูลและอัลกอริทึมที่เหมาะสมกับปัญหา
- 7.2 แนวทางการออกแบบโปรเจกต์ (Project Design)
  - 7.2.1 การรวบรวมความต้องการ (Requirement Gathering)
  - 7.2.2 การออกแบบโครงสร้างข้อมูล (Data Structure Design)
- 7.3 การลงมือปฏิบัติ (Implementation)
- 7.4 การทดสอบ (Testing)
  - 7.4.1 การสร้าง Test Case
  - 7.4.2 การวิเคราะห์ประสิทธิภาพ (Performance Profiling)
- 7.5 การทำเอกสาร (Documentation) และการนำเสนอผลงาน (Presentation)
